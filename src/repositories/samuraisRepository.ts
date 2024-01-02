import {samurais, samurais as db} from "../db/samuraiDB";
import {PutSamuraiByIdReqBodyDTO} from "../dto/PutSamuraiDTO";
import {SamuraiViewModel} from "../dto/SamuraiViewModel";
import {getSamuraiViewModel} from "../utils/getSamuraiViewModel";

export const samuraisRepository = {
	findSamurais(name?:string){
		let filteredSamurais: SamuraiViewModel[] = db.map(getSamuraiViewModel)
		if (name) {
			filteredSamurais = filteredSamurais.filter((samurai) => {
				return samurai.name.includes(name);
			});
		}
		return filteredSamurais;
	},
	findSamuraiById(id:number){
		return db.find((samurai) => {
			return samurai.id === Number(id)
		});
	},
	createSamurai(name:string){
		const existingSamurai = db.find((samurai) => samurai.name === name);
		if(existingSamurai){
			return {message: "Error: Samurai with this name already exists"}
		}
		const newId = db.length > 0 ? db[db.length - 1].id + 1 : 1;
		db.push({
			id: newId,
			name: name,
			klan: "New Klan",
		});
		return {
			message: "Samurai created",
			samurai: getSamuraiViewModel(db[db.length - 1])
		}
	},
	updateSamurai(samurai:PutSamuraiByIdReqBodyDTO&{id:number}){
		const foundSamuraiIndex = db.findIndex((samuraiFromDb) => {
			return samuraiFromDb.id === Number(samurai.id)
		});
		if (foundSamuraiIndex === -1) {
			return {
				message: "Samurai with this id not found"
			}
		}
		if (!samurai.name?.trim()) {
			return{
				message: "Error: Samurai name is required"
			}
		}
		db[foundSamuraiIndex] = {...db[foundSamuraiIndex], name: samurai.name};
		return {
			message: `Samurai updated`,
			samurai: getSamuraiViewModel(db[foundSamuraiIndex])
		}
	},
	deleteSamurai(id:number){
		const foundSamuraiIndex = db.findIndex((db) => {
			return db.id === Number(id)
		});
		if (foundSamuraiIndex === -1) {
			return {
				message: "Samurai with this id not found"
			}
		}
		const deletedSamurai = db.splice(foundSamuraiIndex, 1);
		return {
			message: `Samurai deleted`,
			samurai: getSamuraiViewModel(deletedSamurai[0])
		}
	}
}
