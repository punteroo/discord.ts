import type { MethodDecoratorEx } from "@discordx/internal";

import type { IGuild } from "../../index.js";
import { ComponentTypeX } from "../../index.js";
import { DComponent, MetadataStorage } from "../../index.js";

/**
 * Define a modal interaction handler
 * @param id custom id for your modal
 * ___
 * [View Documentation](https://discord-ts.js.org/docs/decorators/gui/modalcomponent)
 * @category Decorator
 */
export function ModalComponent(id?: string | RegExp): MethodDecoratorEx;

/**
 * Define a modal interaction handler
 * @param id custom id for your modal
 * @param params additional configuration
 * ___
 * [View Documentation](https://discord-ts.js.org/docs/decorators/gui/modalcomponent)
 * @category Decorator
 */
export function ModalComponent(
  id: string | RegExp,
  params?: { botIds?: string[]; guilds?: IGuild[] }
): MethodDecoratorEx;

export function ModalComponent(
  id?: string | RegExp,
  params?: { botIds?: string[]; guilds?: IGuild[] }
): MethodDecoratorEx {
  return function <T>(target: Record<string, T>, key: string) {
    const button = DComponent.create(
      ComponentTypeX.Modal,
      id ?? key,
      params?.guilds,
      params?.botIds
    ).decorate(target.constructor, key, target[key]);

    MetadataStorage.instance.addComponentModal(button);
  };
}
