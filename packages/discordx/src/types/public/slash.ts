import type {
  ApplicationCommandOptionType,
  AutocompleteInteraction,
  ChannelType,
} from "discord.js";

import type { DApplicationCommand, IGuild } from "../../index.js";

export type ApplicationCommandParams = {
  botIds?: string[];
  defaultPermission?: boolean;
  description?: string;
  guilds?: IGuild[];
};

export type SlashOptionBase = {
  description?: string;
  required?: false;
};

export type SlashOptionBaseParams = SlashOptionBase & {
  autocomplete?: undefined;
  channelTypes?: undefined;
  maxValue?: undefined;
  minValue?: undefined;
  type?: Exclude<
    ApplicationCommandOptionType,
    | ApplicationCommandOptionType.Subcommand
    | ApplicationCommandOptionType.SubcommandGroup
    | ApplicationCommandOptionType.Channel
  >;
};

export type SlashOptionChannelParams = SlashOptionBase & {
  autocomplete?: undefined;
  channelTypes?: ChannelType[];
  maxValue?: undefined;
  minValue?: undefined;
  type: ApplicationCommandOptionType.Channel;
};

export type SlashOptionAutoCompleteParams = SlashOptionBase & {
  autocomplete?: SlashAutoCompleteOption;
  channelTypes?: undefined;
  maxValue?: undefined;
  minValue?: undefined;
  type:
    | ApplicationCommandOptionType.String
    | ApplicationCommandOptionType.Number
    | ApplicationCommandOptionType.Integer;
};

export type SlashOptionNumberParams = SlashOptionBase & {
  autocomplete?: SlashAutoCompleteOption;
  channelTypes?: undefined;
  maxValue?: number;
  minValue?: number;
  type:
    | ApplicationCommandOptionType.Number
    | ApplicationCommandOptionType.Integer;
};

export type SlashOptionParams =
  | SlashOptionBaseParams
  | SlashOptionChannelParams
  | SlashOptionNumberParams
  | SlashOptionAutoCompleteParams;

export type SlashAutoCompleteOption =
  | undefined
  | boolean
  | ((
      interaction: AutocompleteInteraction,
      command: DApplicationCommand
    ) => void | Promise<void>);
