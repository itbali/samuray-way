export type SamuraiFromDb = {
	id: number,
	name: string,
	klan: string,
}
export let samurais: DBType = [
	{id: 1, name: "Hattori Hanzō", klan: "Iga"},
	{id: 2, name: "Miyamoto Musashi", klan: "Miyamoto"},
	{id: 3, name: "Takeda Shingen", klan: "Takeda"},
	{id: 4, name: "Uesugi Kenshin", klan: "Uesugi"},
	{id: 5, name: "Oda Nobunaga", klan: "Oda"},
]

export type DBType = SamuraiFromDb[]
