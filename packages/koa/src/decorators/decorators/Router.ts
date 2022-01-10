import { DRouter, MetadataStorage } from "../../index.js";
import { ClassDecoratorEx } from "@discordx/internal";
import KoaRouter from "@koa/router";

export function Router(options?: {
  description?: string;
  name?: string;
  opts?: KoaRouter.RouterOptions;
}): ClassDecoratorEx {
  return function <T>(target: Record<string, T>) {
    const myClass = target as unknown as new () => unknown;
    const instance = DRouter.create({
      description: options?.description,
      name: options?.name ?? myClass.name,
      opts: options?.opts,
    }).decorate(myClass, myClass.name);
    MetadataStorage.instance.addRouter(instance);
  };
}