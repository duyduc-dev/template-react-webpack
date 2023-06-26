export interface Meta {
  index: boolean;
}

export interface RouteConfig<T = React.ComponentType> {
  path: string;
  component: T;
  layout?: React.FC;
  meta?: Meta;
  children?: RouteConfig<T>[];
}
