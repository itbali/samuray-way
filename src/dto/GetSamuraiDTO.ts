import {SamuraiViewModel} from "./SamuraiViewModel";

/**
 * GetSamuraiReqParamsDTO is a type alias for a subset of the SamuraiViewModel type.
 *
 * You can use this type to define the shape of the request parameters for a GET request to the /samurais endpoint.
 *
 * For example, this kind of request would be used to get a single Samurai by its ID.
 *
 * @example
 * GET /samurais/1
 *
 * @remarks
 *
 * The `Pick` utility type is used to select the `id` property from the `SamuraiViewModel` type.
 */
export type GetSamuraiReqParamsDTO = Pick<SamuraiViewModel, "id">;

/**
 * GetSamuraiResDTO is a type alias for a union of the SamuraiViewModel type and an object with a message property.
 * You can use this type to define the shape of the response for a GET request to the /samurais endpoint.
 *
 * For successful requests, the response will be a SamuraiViewModel object.
 *
 * @example
 * { id: 1, name: "Kikuchiyo"}
 *
 * For unsuccessful requests, the response will be an object with a message property.
 *
 * @example
 * { message: "Samurai not found" }
 */
export type GetSamuraiResDTO = SamuraiViewModel | {message: string};
