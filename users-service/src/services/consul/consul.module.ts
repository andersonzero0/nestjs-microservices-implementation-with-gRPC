import {
  DynamicModule,
  InjectionToken,
  Module,
  OptionalFactoryDependency,
} from '@nestjs/common';
import { ConsulService } from './consul.service';
import { ConsulOptions } from './interfaces/consul.interface';
import { CONSUL_OPTIONS } from './constants';

@Module({})
export class ConsulModule {
  static register(config: {
    options: ConsulOptions;
    isGlobal?: boolean;
  }): DynamicModule {
    return {
      global: config.isGlobal || false,
      module: ConsulModule,
      providers: [
        {
          provide: CONSUL_OPTIONS,
          useValue: config.options,
        },
        ConsulService,
      ],
      exports: [ConsulService],
    };
  }

  static registerAsync(optionsFactory: {
    useFactory: (...args: any[]) => Promise<ConsulOptions> | ConsulOptions;
    inject?: (InjectionToken | OptionalFactoryDependency)[];
    isGlobal?: boolean;
  }): DynamicModule {
    return {
      global: optionsFactory.isGlobal || false,
      module: ConsulModule,
      providers: [
        {
          provide: CONSUL_OPTIONS,
          useFactory: optionsFactory.useFactory,
          inject: optionsFactory.inject || [],
        },
        ConsulService,
      ],
      exports: [ConsulService],
    };
  }
}
