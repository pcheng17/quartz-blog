import { componentRegistry } from "./registry"
import RecentLists from "./RecentLists"

/**
 * Registers components defined in core (quartz/components/) so they can be
 * referenced from quartz.config.yaml layout entries by name, like npm plugins.
 */
export function registerLocalComponents(): void {
  componentRegistry.register("recent-lists", RecentLists, "local")
}
