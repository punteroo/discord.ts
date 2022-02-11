import type { ParameterDecoratorEx } from "@discordx/internal";
import { Modifier } from "@discordx/internal";
import { ApplicationCommandOptionType } from "discord.js";

import type { SlashOptionParams, VerifyName } from "../../index.js";
import {
  DApplicationCommand,
  DApplicationCommandOption,
  MetadataStorage,
} from "../../index.js";

/**
 * Define option for slash command
 * @param name string
 * ___
 * [View Discord.ts Documentation](https://discord-ts.js.org/docs/decorators/commands/slashoption)
 * @category Decorator
 */
export function SlashOption<T extends string>(
  name: VerifyName<T>
): ParameterDecoratorEx;

/**
 * Define option for slash command
 * @param name string
 * @param params additional configuration
 * ___
 * [View Discord.ts Documentation](https://discord-ts.js.org/docs/decorators/commands/slashoption)
 * @category Decorator
 */
export function SlashOption<T extends string>(
  name: VerifyName<T>,
  params?: SlashOptionParams
): ParameterDecoratorEx;

export function SlashOption(
  name: string,
  params?: SlashOptionParams
): ParameterDecoratorEx {
  function getType(type: string): ApplicationCommandOptionType {
    switch (type) {
      case "STRING": {
        return ApplicationCommandOptionType.String;
      }

      case "NUMBER": {
        return ApplicationCommandOptionType.Number;
      }

      case "BOOLEAN": {
        return ApplicationCommandOptionType.Boolean;
      }

      case "CHANNEL":
      case "TEXTCHANNEL":
      case "VOICECHANNEL": {
        return ApplicationCommandOptionType.Channel;
      }

      case "GUILDMEMBER": {
        return ApplicationCommandOptionType.User;
      }

      case "ROLE": {
        return ApplicationCommandOptionType.Role;
      }

      case "USER":
      case "GUILDMEMBER": {
        return ApplicationCommandOptionType.User;
      }

      case "FUNCTION":
        throw Error(`invalid slash option (${name}): ${type}\n`);

      default:
        throw Error(`invalid slash option (${name}): ${type}\n`);
    }
  }

  return function <T>(target: Record<string, T>, key: string, index: number) {
    const reflectedType = (
      Reflect.getMetadata("design:paramtypes", target, key)[
        index
      ] as () => unknown
    ).name.toUpperCase();

    const type: ApplicationCommandOptionType =
      params?.type ?? getType(reflectedType);

    const option = DApplicationCommandOption.create(
      name,
      params?.autocomplete,
      params?.channelTypes,
      params?.description,
      index,
      params?.maxValue,
      params?.minValue,
      params?.required,
      type
    ).decorate(target.constructor, key, target[key], target.constructor, index);

    MetadataStorage.instance.addModifier(
      Modifier.create<DApplicationCommand>((original) => {
        original.options = [...original.options, option];
      }, DApplicationCommand).decorate(
        target.constructor,
        key,
        target[key],
        target.constructor,
        index
      )
    );

    MetadataStorage.instance.addApplicationCommandSlashOption(option);
  };
}
