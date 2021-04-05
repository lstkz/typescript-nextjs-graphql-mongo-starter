import { PubSub } from 'graphql-subscriptions';
import { SubscriptionResolver, SubscriptionResolvers } from './generated';

export const pubsub = new PubSub();

type ExtractPromise<T> = T extends Promise<infer U> ? U : T;
type ExtractResolverType<T> = T extends SubscriptionResolver<
  infer Type,
  any,
  any,
  any,
  any
>
  ? ExtractPromise<Type>
  : never;

type MapToType<T> = {
  [key in keyof T]: ExtractResolverType<T[key]>;
};
type TypeMap = MapToType<SubscriptionResolvers>;

export function publishEvent<T extends TypeMap>(name: string, payload: T) {
  return pubsub.publish(name, payload);
}
