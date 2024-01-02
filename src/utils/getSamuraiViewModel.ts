import {SamuraiFromDb} from "../db/samuraiDB";
import {SamuraiViewModel} from "../dto/SamuraiViewModel";

export const getSamuraiViewModel = (samurai: SamuraiFromDb): SamuraiViewModel => {
	return {
		id: samurai.id,
		name: samurai.name
	}
}
