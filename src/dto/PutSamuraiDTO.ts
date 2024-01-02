import {SamuraiViewModel} from "./SamuraiViewModel";

/**
 * DTO for PUT request parameters of Samurai by ID.
 *
 * @example
 * PUT /samurais/1
 */
export type PutSamuraiByIdReqParamsDTO = {id: number};

/**
 * Represents the request body data for updating a Samurai by its ID.
 *
 * @example
 * PUT /samurais/1, body: {name: "Kikuchiyo"}
 *
 * @remarks
 * The `Omit` utility type is used to remove the `id` property from the `SamuraiViewModel` type.
 *
 * The `Partial` utility type is used to make all properties of the `SamuraiViewModel` type optional.
 */
export type PutSamuraiByIdReqBodyDTO = Omit<Partial<SamuraiViewModel>, "id">;

/**
 * Represents the response data for updating a Samurai by its ID.
 *
 * In the case of a successful request, the response will be an object with a message property and a samurai property.
 *
 * @example
 * {message: "Samurai updated", samurai: {id: 1, name: "Kikuchiyo"}}
 *
 * In the case of an unsuccessful request, the response will be an object with a message property.
 *
 * @example
 * {message: "Samurai not found"}
 *
 * @remarks
 * The `SamuraiViewModel` type is used to represent the updated Samurai.
 */
export type PutSamuraiByIdResDTO = {message: string, samurai: SamuraiViewModel} | {message: string};
