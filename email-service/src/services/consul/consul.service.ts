import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import {
  ConsulOptions,
  ConsulServiceOptions,
  IConsulService,
  ServiceCheck,
  ServiceHealthStatus,
  ServiceResult,
} from './interfaces/consul.interface';
import { CONSUL_OPTIONS } from './constants';
import Consul from 'consul';

@Injectable()
export class ConsulService implements OnModuleInit {
  private consul: Consul;
  private logger = new Logger(ConsulService.name);

  constructor(@Inject(CONSUL_OPTIONS) private options: ConsulOptions) {
    this.consul = new Consul({
      host: options.host,
      port: options.port,
      secure: options.secure,
    });
  }

  async onModuleInit() {
    if (this.options.service) {
      await this.registerService(this.options.service);
    }
  }

  async registerService(serviceOptions: ConsulServiceOptions): Promise<void> {
    const service = {
      id: serviceOptions.id || serviceOptions.name,
      name: serviceOptions.name,
      address: serviceOptions.address,
      port: serviceOptions.port,
      tags: serviceOptions.tags,
      check: {
        http: serviceOptions.check.http,
        interval: serviceOptions.check.interval,
        name:
          serviceOptions.check.name || `${serviceOptions.name}-health-check`,
        timeout: serviceOptions.check.timeout || '5s',
      },
    };

    await this.consul.agent.service.register(service);
    this.logger.log(`Service ${service.name} registered with Consul`);
  }

  async getService(serviceName: string): Promise<IConsulService> {
    const services = await this.discoverServices();
    const filteredServices = services.filter(
      (service) => service.Service === serviceName,
    );

    if (filteredServices.length === 0) {
      this.logger.error(`Service ${serviceName} not found`);
      throw new Error(`Service ${serviceName} not found`);
    }

    const service = filteredServices[0];

    const findServiceHealth = await this.getServiceHealth(serviceName);
    const serviceHealth = findServiceHealth[0];

    const status = serviceHealth.Checks.find(
      (check: ServiceCheck) => check.ServiceID === service.ID,
    );

    if (!status) {
      this.logger.error(`Service ${serviceName} not found`);
      throw new Error(`Service ${serviceName} not found`);
    }

    if (status.Status === ServiceHealthStatus.CRITICAL) {
      this.logger.error(`Service ${serviceName} is down: ${status.Output}`);
      throw new Error(`Service ${serviceName} is down: ${status.Output}`);
    } else if (status.Status === ServiceHealthStatus.WARNING) {
      this.logger.warn(`Service ${serviceName} is warning: ${status.Output}`);
    }

    return service;
  }

  async discoverServices(): Promise<IConsulService[]> {
    const result = await this.consul.agent.services();
    return Object.values(result) as IConsulService[];
  }

  async deregisterService(serviceId: string): Promise<void> {
    await this.consul.agent.service.deregister(serviceId);
  }

  async getServiceHealth(serviceName: string): Promise<ServiceResult[]> {
    const checks = (await this.consul.health.service(
      serviceName,
    )) as ServiceResult[];
    return checks;
  }
}
