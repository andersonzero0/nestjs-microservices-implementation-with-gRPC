export interface IConsulService {
  ID: string;
  Service: string;
  Tags: string[];
  Address: string;
  Meta: Record<string, string>;
  Port: number;
  Weights: {
    Passing: number;
    Warning: number;
  };
  EnableTagOverride: boolean;
  Datacenter: string;
}

export interface ConsulServiceOptions {
  id?: string;
  name: string;
  address: string;
  port: number;
  tags: string[];
  check: {
    http: string;
    interval: string;
    name?: string; // Optional property
    timeout?: string; // Optional property
  };
}

export interface ConsulOptions {
  isGlobal?: boolean;
  host: string;
  port: number;
  secure?: boolean;
  service?: ConsulServiceOptions;
}

export enum ServiceHealthStatus {
  PASSING = 'passing',
  WARNING = 'warning',
  CRITICAL = 'critical',
}

export interface ServiceCheck {
  Node: string;
  CheckID: string;
  Name: string;
  Status: ServiceHealthStatus;
  Notes: string;
  Output: string;
  ServiceID?: string; // Optional property
  ServiceName?: string; // Optional property
  ServiceTags?: string[]; // Optional property
  Type?: string; // Optional property
  Interval?: string; // Optional property
  Timeout?: string; // Optional property
}

export type ServiceResult = {
  Node: {
    ID: string;
    Node: string;
    Address: string;
    Datacenter: string;
    TaggedAddresses: {
      lan: string;
      lan_ipv4: string;
      wan: string;
      wan_ipv4: string;
    };
    Meta: Record<string, string>;
    CreateIndex: number;
    ModifyIndex: number;
  };
  Service: IConsulService;
  Checks: Array<ServiceCheck>;
};
