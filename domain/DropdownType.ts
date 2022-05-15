
export type DropDownType = {
    open: boolean,
    value: string,
    items: Array<ItemType>
    label: string
}

export type ItemType = {
    label: string,
    value: string
}