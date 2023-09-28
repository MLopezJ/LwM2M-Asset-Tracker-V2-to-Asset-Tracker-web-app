export type Mutable<Type> = {
	-readonly [Key in keyof Type]: Type[Key]
}

/**
 * First element from instance is the default option to be selected
 * @see {@link ../../adr/004-instance-selected-when-multiple-instance.md}
 */
export const firstElementfromInstances = <T>(instances: T[]): T | undefined =>
	instances[0]
