import {
  MetadataStorage,
  DApplicationCommand,
  Modifier,
  DDiscord,
} from "../..";
import { DSimpleCommand } from "../classes/DSimpleCommand";

/**
 * This decorator is a shortcut to set the name property
 * @param name string
 * ___
 * [View Documentation](https://oceanroleplay.github.io/discord.ts/docs/decorators/name)
 */
export function Name(name: string) {
  return function (
    target: Record<string, any>,
    key?: string,
    descriptor?: PropertyDescriptor
  ) {
    MetadataStorage.instance.addModifier(
      Modifier.create<DApplicationCommand | DSimpleCommand | DDiscord>(
        (original) => {
          original.name = name;
        },
        DApplicationCommand,
        DSimpleCommand,
        DDiscord
      ).decorateUnknown(target, key, descriptor)
    );
  };
}
