import {SamuraiViewModel} from "./SamuraiViewModel";

/**
 * GetSamuraisQueryDTO is a type alias for a subset of the SamuraiViewModel type.
 * You can use this type to define the shape of the query parameters for a GET request to the /samurais endpoint.
 *
 * For example, this kind of request would be used to get all Samurais with a name that starts with "Kiku".
 *
 * @example
 * GET /samurais?name=Kiku
 *
 */
export type GetSamuraisQueryDTO = Pick<SamuraiViewModel, "id" | "name">;

/**
 * GetSamuraisResDTO is a type alias for a union of the SamuraiViewModel type and an object with a message property.
 * You can use this type to define the shape of the response for a GET request to the /samurais endpoint.
 *
 * For successful requests, the response will be an array of SamuraiViewModel objects.
 *
 * @example
 * [{ id: 1, name: "Kikuchiyo"}, { id: 2, name: "Kambei"}]
 *
 * For unsuccessful requests, the response will be an object with a message property.
 * @example
 * { message: "Samurais not found" }
 */
export type GetSamuraisResDTO = SamuraiViewModel[] | {message: string};
