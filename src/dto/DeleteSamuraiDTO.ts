import {SamuraiViewModel} from "./SamuraiViewModel";

/**
 * DeleteSamuraiReqParamsDTO is a type alias for a subset of the SamuraiViewModel type.
 * You can use this type to define the shape of the request parameters for a DELETE request to the /samurais endpoint.
 *
 * For example, this kind of request would be used to delete a single Samurai by its ID.
 *
 * @example
 * DELETE /samurais/1
 */
export type DeleteSamuraiReqParamsDTO = Pick<SamuraiViewModel, "id">;

/**
 * DeleteSamuraiResDTO is a type alias for a union of the SamuraiViewModel type and an object with a message property.
 * You can use this type to define the shape of the response for a DELETE request to the /samurais endpoint.
 *
 * For successful requests, the response will be a SamuraiViewModel object with a message property.
 *
 * @example
 * { message: "Samurai deleted", samurai: { id: 1, name: "Kikuchiyo"}}
 *
 * For unsuccessful requests, the response will be an object with a message property.
 *
 * @example
 * { message: "Samurai not found" }
 */
export type DeleteSamuraiResDTO = {message: string, samurai: SamuraiViewModel} | {message: string}
