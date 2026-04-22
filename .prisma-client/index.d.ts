
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model AuthProvider
 * 
 */
export type AuthProvider = $Result.DefaultSelection<Prisma.$AuthProviderPayload>
/**
 * Model PasswordReset
 * 
 */
export type PasswordReset = $Result.DefaultSelection<Prisma.$PasswordResetPayload>
/**
 * Model UserProfile
 * 
 */
export type UserProfile = $Result.DefaultSelection<Prisma.$UserProfilePayload>
/**
 * Model PsychologistProfile
 * 
 */
export type PsychologistProfile = $Result.DefaultSelection<Prisma.$PsychologistProfilePayload>
/**
 * Model Education
 * 
 */
export type Education = $Result.DefaultSelection<Prisma.$EducationPayload>
/**
 * Model Experience
 * 
 */
export type Experience = $Result.DefaultSelection<Prisma.$ExperiencePayload>
/**
 * Model Specialization
 * 
 */
export type Specialization = $Result.DefaultSelection<Prisma.$SpecializationPayload>
/**
 * Model Expertise
 * 
 */
export type Expertise = $Result.DefaultSelection<Prisma.$ExpertisePayload>
/**
 * Model Schedule
 * 
 */
export type Schedule = $Result.DefaultSelection<Prisma.$SchedulePayload>
/**
 * Model EmailVerification
 * 
 */
export type EmailVerification = $Result.DefaultSelection<Prisma.$EmailVerificationPayload>
/**
 * Model SessionNote
 * 
 */
export type SessionNote = $Result.DefaultSelection<Prisma.$SessionNotePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN',
  PSYCHOLOGIST: 'PSYCHOLOGIST'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const RiskLevel: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type RiskLevel = $Enums.RiskLevel

export const RiskLevel: typeof $Enums.RiskLevel

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authProvider`: Exposes CRUD operations for the **AuthProvider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthProviders
    * const authProviders = await prisma.authProvider.findMany()
    * ```
    */
  get authProvider(): Prisma.AuthProviderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordReset`: Exposes CRUD operations for the **PasswordReset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResets
    * const passwordResets = await prisma.passwordReset.findMany()
    * ```
    */
  get passwordReset(): Prisma.PasswordResetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userProfile`: Exposes CRUD operations for the **UserProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProfiles
    * const userProfiles = await prisma.userProfile.findMany()
    * ```
    */
  get userProfile(): Prisma.UserProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.psychologistProfile`: Exposes CRUD operations for the **PsychologistProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PsychologistProfiles
    * const psychologistProfiles = await prisma.psychologistProfile.findMany()
    * ```
    */
  get psychologistProfile(): Prisma.PsychologistProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.education`: Exposes CRUD operations for the **Education** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Educations
    * const educations = await prisma.education.findMany()
    * ```
    */
  get education(): Prisma.EducationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.experience`: Exposes CRUD operations for the **Experience** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Experiences
    * const experiences = await prisma.experience.findMany()
    * ```
    */
  get experience(): Prisma.ExperienceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.specialization`: Exposes CRUD operations for the **Specialization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Specializations
    * const specializations = await prisma.specialization.findMany()
    * ```
    */
  get specialization(): Prisma.SpecializationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expertise`: Exposes CRUD operations for the **Expertise** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expertise
    * const expertise = await prisma.expertise.findMany()
    * ```
    */
  get expertise(): Prisma.ExpertiseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.schedule`: Exposes CRUD operations for the **Schedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schedules
    * const schedules = await prisma.schedule.findMany()
    * ```
    */
  get schedule(): Prisma.ScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailVerification`: Exposes CRUD operations for the **EmailVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailVerifications
    * const emailVerifications = await prisma.emailVerification.findMany()
    * ```
    */
  get emailVerification(): Prisma.EmailVerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sessionNote`: Exposes CRUD operations for the **SessionNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SessionNotes
    * const sessionNotes = await prisma.sessionNote.findMany()
    * ```
    */
  get sessionNote(): Prisma.SessionNoteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    AuthProvider: 'AuthProvider',
    PasswordReset: 'PasswordReset',
    UserProfile: 'UserProfile',
    PsychologistProfile: 'PsychologistProfile',
    Education: 'Education',
    Experience: 'Experience',
    Specialization: 'Specialization',
    Expertise: 'Expertise',
    Schedule: 'Schedule',
    EmailVerification: 'EmailVerification',
    SessionNote: 'SessionNote'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "authProvider" | "passwordReset" | "userProfile" | "psychologistProfile" | "education" | "experience" | "specialization" | "expertise" | "schedule" | "emailVerification" | "sessionNote"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      AuthProvider: {
        payload: Prisma.$AuthProviderPayload<ExtArgs>
        fields: Prisma.AuthProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          findFirst: {
            args: Prisma.AuthProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          findMany: {
            args: Prisma.AuthProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[]
          }
          create: {
            args: Prisma.AuthProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          createMany: {
            args: Prisma.AuthProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthProviderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[]
          }
          delete: {
            args: Prisma.AuthProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          update: {
            args: Prisma.AuthProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          deleteMany: {
            args: Prisma.AuthProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthProviderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[]
          }
          upsert: {
            args: Prisma.AuthProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          aggregate: {
            args: Prisma.AuthProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthProvider>
          }
          groupBy: {
            args: Prisma.AuthProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthProviderCountArgs<ExtArgs>
            result: $Utils.Optional<AuthProviderCountAggregateOutputType> | number
          }
        }
      }
      PasswordReset: {
        payload: Prisma.$PasswordResetPayload<ExtArgs>
        fields: Prisma.PasswordResetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findMany: {
            args: Prisma.PasswordResetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          create: {
            args: Prisma.PasswordResetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          createMany: {
            args: Prisma.PasswordResetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          update: {
            args: Prisma.PasswordResetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordReset>
          }
          groupBy: {
            args: Prisma.PasswordResetGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetCountAggregateOutputType> | number
          }
        }
      }
      UserProfile: {
        payload: Prisma.$UserProfilePayload<ExtArgs>
        fields: Prisma.UserProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findFirst: {
            args: Prisma.UserProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findMany: {
            args: Prisma.UserProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          create: {
            args: Prisma.UserProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          createMany: {
            args: Prisma.UserProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          delete: {
            args: Prisma.UserProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          update: {
            args: Prisma.UserProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          deleteMany: {
            args: Prisma.UserProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          upsert: {
            args: Prisma.UserProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          aggregate: {
            args: Prisma.UserProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProfile>
          }
          groupBy: {
            args: Prisma.UserProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProfileCountArgs<ExtArgs>
            result: $Utils.Optional<UserProfileCountAggregateOutputType> | number
          }
        }
      }
      PsychologistProfile: {
        payload: Prisma.$PsychologistProfilePayload<ExtArgs>
        fields: Prisma.PsychologistProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PsychologistProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PsychologistProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistProfilePayload>
          }
          findFirst: {
            args: Prisma.PsychologistProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PsychologistProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistProfilePayload>
          }
          findMany: {
            args: Prisma.PsychologistProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistProfilePayload>[]
          }
          create: {
            args: Prisma.PsychologistProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistProfilePayload>
          }
          createMany: {
            args: Prisma.PsychologistProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PsychologistProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistProfilePayload>[]
          }
          delete: {
            args: Prisma.PsychologistProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistProfilePayload>
          }
          update: {
            args: Prisma.PsychologistProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistProfilePayload>
          }
          deleteMany: {
            args: Prisma.PsychologistProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PsychologistProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PsychologistProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistProfilePayload>[]
          }
          upsert: {
            args: Prisma.PsychologistProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistProfilePayload>
          }
          aggregate: {
            args: Prisma.PsychologistProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePsychologistProfile>
          }
          groupBy: {
            args: Prisma.PsychologistProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<PsychologistProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.PsychologistProfileCountArgs<ExtArgs>
            result: $Utils.Optional<PsychologistProfileCountAggregateOutputType> | number
          }
        }
      }
      Education: {
        payload: Prisma.$EducationPayload<ExtArgs>
        fields: Prisma.EducationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EducationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EducationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          findFirst: {
            args: Prisma.EducationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EducationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          findMany: {
            args: Prisma.EducationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[]
          }
          create: {
            args: Prisma.EducationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          createMany: {
            args: Prisma.EducationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EducationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[]
          }
          delete: {
            args: Prisma.EducationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          update: {
            args: Prisma.EducationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          deleteMany: {
            args: Prisma.EducationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EducationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EducationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[]
          }
          upsert: {
            args: Prisma.EducationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          aggregate: {
            args: Prisma.EducationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEducation>
          }
          groupBy: {
            args: Prisma.EducationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EducationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EducationCountArgs<ExtArgs>
            result: $Utils.Optional<EducationCountAggregateOutputType> | number
          }
        }
      }
      Experience: {
        payload: Prisma.$ExperiencePayload<ExtArgs>
        fields: Prisma.ExperienceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExperienceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExperienceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          findFirst: {
            args: Prisma.ExperienceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExperienceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          findMany: {
            args: Prisma.ExperienceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[]
          }
          create: {
            args: Prisma.ExperienceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          createMany: {
            args: Prisma.ExperienceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExperienceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[]
          }
          delete: {
            args: Prisma.ExperienceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          update: {
            args: Prisma.ExperienceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          deleteMany: {
            args: Prisma.ExperienceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExperienceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExperienceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[]
          }
          upsert: {
            args: Prisma.ExperienceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          aggregate: {
            args: Prisma.ExperienceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExperience>
          }
          groupBy: {
            args: Prisma.ExperienceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExperienceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExperienceCountArgs<ExtArgs>
            result: $Utils.Optional<ExperienceCountAggregateOutputType> | number
          }
        }
      }
      Specialization: {
        payload: Prisma.$SpecializationPayload<ExtArgs>
        fields: Prisma.SpecializationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpecializationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecializationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpecializationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecializationPayload>
          }
          findFirst: {
            args: Prisma.SpecializationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecializationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpecializationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecializationPayload>
          }
          findMany: {
            args: Prisma.SpecializationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecializationPayload>[]
          }
          create: {
            args: Prisma.SpecializationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecializationPayload>
          }
          createMany: {
            args: Prisma.SpecializationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpecializationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecializationPayload>[]
          }
          delete: {
            args: Prisma.SpecializationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecializationPayload>
          }
          update: {
            args: Prisma.SpecializationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecializationPayload>
          }
          deleteMany: {
            args: Prisma.SpecializationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpecializationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SpecializationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecializationPayload>[]
          }
          upsert: {
            args: Prisma.SpecializationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecializationPayload>
          }
          aggregate: {
            args: Prisma.SpecializationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpecialization>
          }
          groupBy: {
            args: Prisma.SpecializationGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpecializationGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpecializationCountArgs<ExtArgs>
            result: $Utils.Optional<SpecializationCountAggregateOutputType> | number
          }
        }
      }
      Expertise: {
        payload: Prisma.$ExpertisePayload<ExtArgs>
        fields: Prisma.ExpertiseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpertiseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpertisePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpertiseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpertisePayload>
          }
          findFirst: {
            args: Prisma.ExpertiseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpertisePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpertiseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpertisePayload>
          }
          findMany: {
            args: Prisma.ExpertiseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpertisePayload>[]
          }
          create: {
            args: Prisma.ExpertiseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpertisePayload>
          }
          createMany: {
            args: Prisma.ExpertiseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpertiseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpertisePayload>[]
          }
          delete: {
            args: Prisma.ExpertiseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpertisePayload>
          }
          update: {
            args: Prisma.ExpertiseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpertisePayload>
          }
          deleteMany: {
            args: Prisma.ExpertiseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpertiseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExpertiseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpertisePayload>[]
          }
          upsert: {
            args: Prisma.ExpertiseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpertisePayload>
          }
          aggregate: {
            args: Prisma.ExpertiseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpertise>
          }
          groupBy: {
            args: Prisma.ExpertiseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpertiseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpertiseCountArgs<ExtArgs>
            result: $Utils.Optional<ExpertiseCountAggregateOutputType> | number
          }
        }
      }
      Schedule: {
        payload: Prisma.$SchedulePayload<ExtArgs>
        fields: Prisma.ScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findFirst: {
            args: Prisma.ScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findMany: {
            args: Prisma.ScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          create: {
            args: Prisma.ScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          createMany: {
            args: Prisma.ScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          delete: {
            args: Prisma.ScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          update: {
            args: Prisma.ScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          deleteMany: {
            args: Prisma.ScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          upsert: {
            args: Prisma.ScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          aggregate: {
            args: Prisma.ScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchedule>
          }
          groupBy: {
            args: Prisma.ScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduleCountAggregateOutputType> | number
          }
        }
      }
      EmailVerification: {
        payload: Prisma.$EmailVerificationPayload<ExtArgs>
        fields: Prisma.EmailVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>
          }
          findFirst: {
            args: Prisma.EmailVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>
          }
          findMany: {
            args: Prisma.EmailVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>[]
          }
          create: {
            args: Prisma.EmailVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>
          }
          createMany: {
            args: Prisma.EmailVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailVerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>[]
          }
          delete: {
            args: Prisma.EmailVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>
          }
          update: {
            args: Prisma.EmailVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>
          }
          deleteMany: {
            args: Prisma.EmailVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailVerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>[]
          }
          upsert: {
            args: Prisma.EmailVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>
          }
          aggregate: {
            args: Prisma.EmailVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailVerification>
          }
          groupBy: {
            args: Prisma.EmailVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<EmailVerificationCountAggregateOutputType> | number
          }
        }
      }
      SessionNote: {
        payload: Prisma.$SessionNotePayload<ExtArgs>
        fields: Prisma.SessionNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionNotePayload>
          }
          findFirst: {
            args: Prisma.SessionNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionNotePayload>
          }
          findMany: {
            args: Prisma.SessionNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionNotePayload>[]
          }
          create: {
            args: Prisma.SessionNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionNotePayload>
          }
          createMany: {
            args: Prisma.SessionNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionNotePayload>[]
          }
          delete: {
            args: Prisma.SessionNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionNotePayload>
          }
          update: {
            args: Prisma.SessionNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionNotePayload>
          }
          deleteMany: {
            args: Prisma.SessionNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionNotePayload>[]
          }
          upsert: {
            args: Prisma.SessionNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionNotePayload>
          }
          aggregate: {
            args: Prisma.SessionNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSessionNote>
          }
          groupBy: {
            args: Prisma.SessionNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionNoteCountArgs<ExtArgs>
            result: $Utils.Optional<SessionNoteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    authProvider?: AuthProviderOmit
    passwordReset?: PasswordResetOmit
    userProfile?: UserProfileOmit
    psychologistProfile?: PsychologistProfileOmit
    education?: EducationOmit
    experience?: ExperienceOmit
    specialization?: SpecializationOmit
    expertise?: ExpertiseOmit
    schedule?: ScheduleOmit
    emailVerification?: EmailVerificationOmit
    sessionNote?: SessionNoteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    passwordResets: number
    emailVerifications: number
    sessionNotes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passwordResets?: boolean | UserCountOutputTypeCountPasswordResetsArgs
    emailVerifications?: boolean | UserCountOutputTypeCountEmailVerificationsArgs
    sessionNotes?: boolean | UserCountOutputTypeCountSessionNotesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasswordResetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEmailVerificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailVerificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionNoteWhereInput
  }


  /**
   * Count Type PsychologistProfileCountOutputType
   */

  export type PsychologistProfileCountOutputType = {
    educations: number
    experiences: number
    specializations: number
    expertises: number
    schedules: number
    sessionNotes: number
  }

  export type PsychologistProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    educations?: boolean | PsychologistProfileCountOutputTypeCountEducationsArgs
    experiences?: boolean | PsychologistProfileCountOutputTypeCountExperiencesArgs
    specializations?: boolean | PsychologistProfileCountOutputTypeCountSpecializationsArgs
    expertises?: boolean | PsychologistProfileCountOutputTypeCountExpertisesArgs
    schedules?: boolean | PsychologistProfileCountOutputTypeCountSchedulesArgs
    sessionNotes?: boolean | PsychologistProfileCountOutputTypeCountSessionNotesArgs
  }

  // Custom InputTypes
  /**
   * PsychologistProfileCountOutputType without action
   */
  export type PsychologistProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfileCountOutputType
     */
    select?: PsychologistProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PsychologistProfileCountOutputType without action
   */
  export type PsychologistProfileCountOutputTypeCountEducationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EducationWhereInput
  }

  /**
   * PsychologistProfileCountOutputType without action
   */
  export type PsychologistProfileCountOutputTypeCountExperiencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperienceWhereInput
  }

  /**
   * PsychologistProfileCountOutputType without action
   */
  export type PsychologistProfileCountOutputTypeCountSpecializationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpecializationWhereInput
  }

  /**
   * PsychologistProfileCountOutputType without action
   */
  export type PsychologistProfileCountOutputTypeCountExpertisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpertiseWhereInput
  }

  /**
   * PsychologistProfileCountOutputType without action
   */
  export type PsychologistProfileCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
  }

  /**
   * PsychologistProfileCountOutputType without action
   */
  export type PsychologistProfileCountOutputTypeCountSessionNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionNoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.Role | null
    isEmailVerified: boolean | null
    isProfileComplete: boolean | null
    isFirstLogin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.Role | null
    isEmailVerified: boolean | null
    isProfileComplete: boolean | null
    isFirstLogin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    role: number
    isEmailVerified: number
    isProfileComplete: number
    isFirstLogin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    role?: true
    isEmailVerified?: true
    isProfileComplete?: true
    isFirstLogin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    role?: true
    isEmailVerified?: true
    isProfileComplete?: true
    isFirstLogin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    role?: true
    isEmailVerified?: true
    isProfileComplete?: true
    isFirstLogin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    role: $Enums.Role
    isEmailVerified: boolean
    isProfileComplete: boolean
    isFirstLogin: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authProvider?: boolean | User$authProviderArgs<ExtArgs>
    passwordResets?: boolean | User$passwordResetsArgs<ExtArgs>
    userProfile?: boolean | User$userProfileArgs<ExtArgs>
    psychologistProfile?: boolean | User$psychologistProfileArgs<ExtArgs>
    emailVerifications?: boolean | User$emailVerificationsArgs<ExtArgs>
    sessionNotes?: boolean | User$sessionNotesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    role?: boolean
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "role" | "isEmailVerified" | "isProfileComplete" | "isFirstLogin" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authProvider?: boolean | User$authProviderArgs<ExtArgs>
    passwordResets?: boolean | User$passwordResetsArgs<ExtArgs>
    userProfile?: boolean | User$userProfileArgs<ExtArgs>
    psychologistProfile?: boolean | User$psychologistProfileArgs<ExtArgs>
    emailVerifications?: boolean | User$emailVerificationsArgs<ExtArgs>
    sessionNotes?: boolean | User$sessionNotesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      authProvider: Prisma.$AuthProviderPayload<ExtArgs> | null
      passwordResets: Prisma.$PasswordResetPayload<ExtArgs>[]
      userProfile: Prisma.$UserProfilePayload<ExtArgs> | null
      psychologistProfile: Prisma.$PsychologistProfilePayload<ExtArgs> | null
      emailVerifications: Prisma.$EmailVerificationPayload<ExtArgs>[]
      sessionNotes: Prisma.$SessionNotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      role: $Enums.Role
      isEmailVerified: boolean
      isProfileComplete: boolean
      isFirstLogin: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    authProvider<T extends User$authProviderArgs<ExtArgs> = {}>(args?: Subset<T, User$authProviderArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    passwordResets<T extends User$passwordResetsArgs<ExtArgs> = {}>(args?: Subset<T, User$passwordResetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userProfile<T extends User$userProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$userProfileArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    psychologistProfile<T extends User$psychologistProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$psychologistProfileArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    emailVerifications<T extends User$emailVerificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$emailVerificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessionNotes<T extends User$sessionNotesArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionNotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isEmailVerified: FieldRef<"User", 'Boolean'>
    readonly isProfileComplete: FieldRef<"User", 'Boolean'>
    readonly isFirstLogin: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.authProvider
   */
  export type User$authProviderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    where?: AuthProviderWhereInput
  }

  /**
   * User.passwordResets
   */
  export type User$passwordResetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    where?: PasswordResetWhereInput
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    cursor?: PasswordResetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * User.userProfile
   */
  export type User$userProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    where?: UserProfileWhereInput
  }

  /**
   * User.psychologistProfile
   */
  export type User$psychologistProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfile
     */
    select?: PsychologistProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PsychologistProfile
     */
    omit?: PsychologistProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistProfileInclude<ExtArgs> | null
    where?: PsychologistProfileWhereInput
  }

  /**
   * User.emailVerifications
   */
  export type User$emailVerificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationInclude<ExtArgs> | null
    where?: EmailVerificationWhereInput
    orderBy?: EmailVerificationOrderByWithRelationInput | EmailVerificationOrderByWithRelationInput[]
    cursor?: EmailVerificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailVerificationScalarFieldEnum | EmailVerificationScalarFieldEnum[]
  }

  /**
   * User.sessionNotes
   */
  export type User$sessionNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteInclude<ExtArgs> | null
    where?: SessionNoteWhereInput
    orderBy?: SessionNoteOrderByWithRelationInput | SessionNoteOrderByWithRelationInput[]
    cursor?: SessionNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionNoteScalarFieldEnum | SessionNoteScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model AuthProvider
   */

  export type AggregateAuthProvider = {
    _count: AuthProviderCountAggregateOutputType | null
    _min: AuthProviderMinAggregateOutputType | null
    _max: AuthProviderMaxAggregateOutputType | null
  }

  export type AuthProviderMinAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    providerId: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthProviderMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    providerId: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthProviderCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    providerId: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AuthProviderMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthProviderMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthProviderCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AuthProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthProvider to aggregate.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthProviders
    **/
    _count?: true | AuthProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthProviderMaxAggregateInputType
  }

  export type GetAuthProviderAggregateType<T extends AuthProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthProvider[P]>
      : GetScalarType<T[P], AggregateAuthProvider[P]>
  }




  export type AuthProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthProviderWhereInput
    orderBy?: AuthProviderOrderByWithAggregationInput | AuthProviderOrderByWithAggregationInput[]
    by: AuthProviderScalarFieldEnum[] | AuthProviderScalarFieldEnum
    having?: AuthProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthProviderCountAggregateInputType | true
    _min?: AuthProviderMinAggregateInputType
    _max?: AuthProviderMaxAggregateInputType
  }

  export type AuthProviderGroupByOutputType = {
    id: string
    userId: string
    provider: string
    providerId: string | null
    passwordHash: string | null
    createdAt: Date
    updatedAt: Date
    _count: AuthProviderCountAggregateOutputType | null
    _min: AuthProviderMinAggregateOutputType | null
    _max: AuthProviderMaxAggregateOutputType | null
  }

  type GetAuthProviderGroupByPayload<T extends AuthProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthProviderGroupByOutputType[P]>
            : GetScalarType<T[P], AuthProviderGroupByOutputType[P]>
        }
      >
    >


  export type AuthProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authProvider"]>

  export type AuthProviderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authProvider"]>

  export type AuthProviderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authProvider"]>

  export type AuthProviderSelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AuthProviderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "provider" | "providerId" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["authProvider"]>
  export type AuthProviderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthProviderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthProviderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuthProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthProvider"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      provider: string
      providerId: string | null
      passwordHash: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["authProvider"]>
    composites: {}
  }

  type AuthProviderGetPayload<S extends boolean | null | undefined | AuthProviderDefaultArgs> = $Result.GetResult<Prisma.$AuthProviderPayload, S>

  type AuthProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthProviderCountAggregateInputType | true
    }

  export interface AuthProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthProvider'], meta: { name: 'AuthProvider' } }
    /**
     * Find zero or one AuthProvider that matches the filter.
     * @param {AuthProviderFindUniqueArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthProviderFindUniqueArgs>(args: SelectSubset<T, AuthProviderFindUniqueArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthProvider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthProviderFindUniqueOrThrowArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthProvider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindFirstArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthProviderFindFirstArgs>(args?: SelectSubset<T, AuthProviderFindFirstArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthProvider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindFirstOrThrowArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthProviders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthProviders
     * const authProviders = await prisma.authProvider.findMany()
     * 
     * // Get first 10 AuthProviders
     * const authProviders = await prisma.authProvider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authProviderWithIdOnly = await prisma.authProvider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthProviderFindManyArgs>(args?: SelectSubset<T, AuthProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthProvider.
     * @param {AuthProviderCreateArgs} args - Arguments to create a AuthProvider.
     * @example
     * // Create one AuthProvider
     * const AuthProvider = await prisma.authProvider.create({
     *   data: {
     *     // ... data to create a AuthProvider
     *   }
     * })
     * 
     */
    create<T extends AuthProviderCreateArgs>(args: SelectSubset<T, AuthProviderCreateArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthProviders.
     * @param {AuthProviderCreateManyArgs} args - Arguments to create many AuthProviders.
     * @example
     * // Create many AuthProviders
     * const authProvider = await prisma.authProvider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthProviderCreateManyArgs>(args?: SelectSubset<T, AuthProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthProviders and returns the data saved in the database.
     * @param {AuthProviderCreateManyAndReturnArgs} args - Arguments to create many AuthProviders.
     * @example
     * // Create many AuthProviders
     * const authProvider = await prisma.authProvider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthProviders and only return the `id`
     * const authProviderWithIdOnly = await prisma.authProvider.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthProviderCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthProviderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuthProvider.
     * @param {AuthProviderDeleteArgs} args - Arguments to delete one AuthProvider.
     * @example
     * // Delete one AuthProvider
     * const AuthProvider = await prisma.authProvider.delete({
     *   where: {
     *     // ... filter to delete one AuthProvider
     *   }
     * })
     * 
     */
    delete<T extends AuthProviderDeleteArgs>(args: SelectSubset<T, AuthProviderDeleteArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthProvider.
     * @param {AuthProviderUpdateArgs} args - Arguments to update one AuthProvider.
     * @example
     * // Update one AuthProvider
     * const authProvider = await prisma.authProvider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthProviderUpdateArgs>(args: SelectSubset<T, AuthProviderUpdateArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthProviders.
     * @param {AuthProviderDeleteManyArgs} args - Arguments to filter AuthProviders to delete.
     * @example
     * // Delete a few AuthProviders
     * const { count } = await prisma.authProvider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthProviderDeleteManyArgs>(args?: SelectSubset<T, AuthProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthProviders
     * const authProvider = await prisma.authProvider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthProviderUpdateManyArgs>(args: SelectSubset<T, AuthProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthProviders and returns the data updated in the database.
     * @param {AuthProviderUpdateManyAndReturnArgs} args - Arguments to update many AuthProviders.
     * @example
     * // Update many AuthProviders
     * const authProvider = await prisma.authProvider.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuthProviders and only return the `id`
     * const authProviderWithIdOnly = await prisma.authProvider.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthProviderUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthProviderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuthProvider.
     * @param {AuthProviderUpsertArgs} args - Arguments to update or create a AuthProvider.
     * @example
     * // Update or create a AuthProvider
     * const authProvider = await prisma.authProvider.upsert({
     *   create: {
     *     // ... data to create a AuthProvider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthProvider we want to update
     *   }
     * })
     */
    upsert<T extends AuthProviderUpsertArgs>(args: SelectSubset<T, AuthProviderUpsertArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderCountArgs} args - Arguments to filter AuthProviders to count.
     * @example
     * // Count the number of AuthProviders
     * const count = await prisma.authProvider.count({
     *   where: {
     *     // ... the filter for the AuthProviders we want to count
     *   }
     * })
    **/
    count<T extends AuthProviderCountArgs>(
      args?: Subset<T, AuthProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthProviderAggregateArgs>(args: Subset<T, AuthProviderAggregateArgs>): Prisma.PrismaPromise<GetAuthProviderAggregateType<T>>

    /**
     * Group by AuthProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthProviderGroupByArgs['orderBy'] }
        : { orderBy?: AuthProviderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthProvider model
   */
  readonly fields: AuthProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthProvider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthProvider model
   */
  interface AuthProviderFieldRefs {
    readonly id: FieldRef<"AuthProvider", 'String'>
    readonly userId: FieldRef<"AuthProvider", 'String'>
    readonly provider: FieldRef<"AuthProvider", 'String'>
    readonly providerId: FieldRef<"AuthProvider", 'String'>
    readonly passwordHash: FieldRef<"AuthProvider", 'String'>
    readonly createdAt: FieldRef<"AuthProvider", 'DateTime'>
    readonly updatedAt: FieldRef<"AuthProvider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthProvider findUnique
   */
  export type AuthProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider findUniqueOrThrow
   */
  export type AuthProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider findFirst
   */
  export type AuthProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthProviders.
     */
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * AuthProvider findFirstOrThrow
   */
  export type AuthProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthProviders.
     */
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * AuthProvider findMany
   */
  export type AuthProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProviders to fetch.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * AuthProvider create
   */
  export type AuthProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthProvider.
     */
    data: XOR<AuthProviderCreateInput, AuthProviderUncheckedCreateInput>
  }

  /**
   * AuthProvider createMany
   */
  export type AuthProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthProviders.
     */
    data: AuthProviderCreateManyInput | AuthProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthProvider createManyAndReturn
   */
  export type AuthProviderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * The data used to create many AuthProviders.
     */
    data: AuthProviderCreateManyInput | AuthProviderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthProvider update
   */
  export type AuthProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthProvider.
     */
    data: XOR<AuthProviderUpdateInput, AuthProviderUncheckedUpdateInput>
    /**
     * Choose, which AuthProvider to update.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider updateMany
   */
  export type AuthProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthProviders.
     */
    data: XOR<AuthProviderUpdateManyMutationInput, AuthProviderUncheckedUpdateManyInput>
    /**
     * Filter which AuthProviders to update
     */
    where?: AuthProviderWhereInput
    /**
     * Limit how many AuthProviders to update.
     */
    limit?: number
  }

  /**
   * AuthProvider updateManyAndReturn
   */
  export type AuthProviderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * The data used to update AuthProviders.
     */
    data: XOR<AuthProviderUpdateManyMutationInput, AuthProviderUncheckedUpdateManyInput>
    /**
     * Filter which AuthProviders to update
     */
    where?: AuthProviderWhereInput
    /**
     * Limit how many AuthProviders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthProvider upsert
   */
  export type AuthProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthProvider to update in case it exists.
     */
    where: AuthProviderWhereUniqueInput
    /**
     * In case the AuthProvider found by the `where` argument doesn't exist, create a new AuthProvider with this data.
     */
    create: XOR<AuthProviderCreateInput, AuthProviderUncheckedCreateInput>
    /**
     * In case the AuthProvider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthProviderUpdateInput, AuthProviderUncheckedUpdateInput>
  }

  /**
   * AuthProvider delete
   */
  export type AuthProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter which AuthProvider to delete.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider deleteMany
   */
  export type AuthProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthProviders to delete
     */
    where?: AuthProviderWhereInput
    /**
     * Limit how many AuthProviders to delete.
     */
    limit?: number
  }

  /**
   * AuthProvider without action
   */
  export type AuthProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
  }


  /**
   * Model PasswordReset
   */

  export type AggregatePasswordReset = {
    _count: PasswordResetCountAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  export type PasswordResetMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    expiresAt: number
    usedAt: number
    createdAt: number
    _all: number
  }


  export type PasswordResetMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type PasswordResetMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type PasswordResetCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordResetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordReset to aggregate.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResets
    **/
    _count?: true | PasswordResetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetMaxAggregateInputType
  }

  export type GetPasswordResetAggregateType<T extends PasswordResetAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordReset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordReset[P]>
      : GetScalarType<T[P], AggregatePasswordReset[P]>
  }




  export type PasswordResetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetWhereInput
    orderBy?: PasswordResetOrderByWithAggregationInput | PasswordResetOrderByWithAggregationInput[]
    by: PasswordResetScalarFieldEnum[] | PasswordResetScalarFieldEnum
    having?: PasswordResetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetCountAggregateInputType | true
    _min?: PasswordResetMinAggregateInputType
    _max?: PasswordResetMaxAggregateInputType
  }

  export type PasswordResetGroupByOutputType = {
    id: string
    userId: string
    token: string
    expiresAt: Date
    usedAt: Date | null
    createdAt: Date
    _count: PasswordResetCountAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  type GetPasswordResetGroupByPayload<T extends PasswordResetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>

  export type PasswordResetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>

  export type PasswordResetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>

  export type PasswordResetSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
  }

  export type PasswordResetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "expiresAt" | "usedAt" | "createdAt", ExtArgs["result"]["passwordReset"]>
  export type PasswordResetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordReset"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      expiresAt: Date
      usedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["passwordReset"]>
    composites: {}
  }

  type PasswordResetGetPayload<S extends boolean | null | undefined | PasswordResetDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetPayload, S>

  type PasswordResetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetCountAggregateInputType | true
    }

  export interface PasswordResetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordReset'], meta: { name: 'PasswordReset' } }
    /**
     * Find zero or one PasswordReset that matches the filter.
     * @param {PasswordResetFindUniqueArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetFindUniqueArgs>(args: SelectSubset<T, PasswordResetFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordReset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetFindUniqueOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetFindFirstArgs>(args?: SelectSubset<T, PasswordResetFindFirstArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany()
     * 
     * // Get first 10 PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetFindManyArgs>(args?: SelectSubset<T, PasswordResetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordReset.
     * @param {PasswordResetCreateArgs} args - Arguments to create a PasswordReset.
     * @example
     * // Create one PasswordReset
     * const PasswordReset = await prisma.passwordReset.create({
     *   data: {
     *     // ... data to create a PasswordReset
     *   }
     * })
     * 
     */
    create<T extends PasswordResetCreateArgs>(args: SelectSubset<T, PasswordResetCreateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResets.
     * @param {PasswordResetCreateManyArgs} args - Arguments to create many PasswordResets.
     * @example
     * // Create many PasswordResets
     * const passwordReset = await prisma.passwordReset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetCreateManyArgs>(args?: SelectSubset<T, PasswordResetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResets and returns the data saved in the database.
     * @param {PasswordResetCreateManyAndReturnArgs} args - Arguments to create many PasswordResets.
     * @example
     * // Create many PasswordResets
     * const passwordReset = await prisma.passwordReset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResets and only return the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordReset.
     * @param {PasswordResetDeleteArgs} args - Arguments to delete one PasswordReset.
     * @example
     * // Delete one PasswordReset
     * const PasswordReset = await prisma.passwordReset.delete({
     *   where: {
     *     // ... filter to delete one PasswordReset
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetDeleteArgs>(args: SelectSubset<T, PasswordResetDeleteArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordReset.
     * @param {PasswordResetUpdateArgs} args - Arguments to update one PasswordReset.
     * @example
     * // Update one PasswordReset
     * const passwordReset = await prisma.passwordReset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetUpdateArgs>(args: SelectSubset<T, PasswordResetUpdateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResets.
     * @param {PasswordResetDeleteManyArgs} args - Arguments to filter PasswordResets to delete.
     * @example
     * // Delete a few PasswordResets
     * const { count } = await prisma.passwordReset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetDeleteManyArgs>(args?: SelectSubset<T, PasswordResetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResets
     * const passwordReset = await prisma.passwordReset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetUpdateManyArgs>(args: SelectSubset<T, PasswordResetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResets and returns the data updated in the database.
     * @param {PasswordResetUpdateManyAndReturnArgs} args - Arguments to update many PasswordResets.
     * @example
     * // Update many PasswordResets
     * const passwordReset = await prisma.passwordReset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResets and only return the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PasswordResetUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordReset.
     * @param {PasswordResetUpsertArgs} args - Arguments to update or create a PasswordReset.
     * @example
     * // Update or create a PasswordReset
     * const passwordReset = await prisma.passwordReset.upsert({
     *   create: {
     *     // ... data to create a PasswordReset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordReset we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetUpsertArgs>(args: SelectSubset<T, PasswordResetUpsertArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetCountArgs} args - Arguments to filter PasswordResets to count.
     * @example
     * // Count the number of PasswordResets
     * const count = await prisma.passwordReset.count({
     *   where: {
     *     // ... the filter for the PasswordResets we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetCountArgs>(
      args?: Subset<T, PasswordResetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetAggregateArgs>(args: Subset<T, PasswordResetAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetAggregateType<T>>

    /**
     * Group by PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordReset model
   */
  readonly fields: PasswordResetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordReset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordReset model
   */
  interface PasswordResetFieldRefs {
    readonly id: FieldRef<"PasswordReset", 'String'>
    readonly userId: FieldRef<"PasswordReset", 'String'>
    readonly token: FieldRef<"PasswordReset", 'String'>
    readonly expiresAt: FieldRef<"PasswordReset", 'DateTime'>
    readonly usedAt: FieldRef<"PasswordReset", 'DateTime'>
    readonly createdAt: FieldRef<"PasswordReset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordReset findUnique
   */
  export type PasswordResetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findUniqueOrThrow
   */
  export type PasswordResetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findFirst
   */
  export type PasswordResetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findFirstOrThrow
   */
  export type PasswordResetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findMany
   */
  export type PasswordResetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResets to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset create
   */
  export type PasswordResetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordReset.
     */
    data: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
  }

  /**
   * PasswordReset createMany
   */
  export type PasswordResetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResets.
     */
    data: PasswordResetCreateManyInput | PasswordResetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordReset createManyAndReturn
   */
  export type PasswordResetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResets.
     */
    data: PasswordResetCreateManyInput | PasswordResetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordReset update
   */
  export type PasswordResetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordReset.
     */
    data: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
    /**
     * Choose, which PasswordReset to update.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset updateMany
   */
  export type PasswordResetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResets.
     */
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResets to update
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to update.
     */
    limit?: number
  }

  /**
   * PasswordReset updateManyAndReturn
   */
  export type PasswordResetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResets.
     */
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResets to update
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordReset upsert
   */
  export type PasswordResetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordReset to update in case it exists.
     */
    where: PasswordResetWhereUniqueInput
    /**
     * In case the PasswordReset found by the `where` argument doesn't exist, create a new PasswordReset with this data.
     */
    create: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
    /**
     * In case the PasswordReset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
  }

  /**
   * PasswordReset delete
   */
  export type PasswordResetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter which PasswordReset to delete.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset deleteMany
   */
  export type PasswordResetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResets to delete
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to delete.
     */
    limit?: number
  }

  /**
   * PasswordReset without action
   */
  export type PasswordResetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
  }


  /**
   * Model UserProfile
   */

  export type AggregateUserProfile = {
    _count: UserProfileCountAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  export type UserProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    birthday: Date | null
    gender: $Enums.Gender | null
    country: string | null
    city: string | null
    fullAddress: string | null
    phone: string | null
  }

  export type UserProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    birthday: Date | null
    gender: $Enums.Gender | null
    country: string | null
    city: string | null
    fullAddress: string | null
    phone: string | null
  }

  export type UserProfileCountAggregateOutputType = {
    id: number
    userId: number
    fullName: number
    birthday: number
    gender: number
    country: number
    city: number
    fullAddress: number
    phone: number
    _all: number
  }


  export type UserProfileMinAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    birthday?: true
    gender?: true
    country?: true
    city?: true
    fullAddress?: true
    phone?: true
  }

  export type UserProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    birthday?: true
    gender?: true
    country?: true
    city?: true
    fullAddress?: true
    phone?: true
  }

  export type UserProfileCountAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    birthday?: true
    gender?: true
    country?: true
    city?: true
    fullAddress?: true
    phone?: true
    _all?: true
  }

  export type UserProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfile to aggregate.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProfiles
    **/
    _count?: true | UserProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProfileMaxAggregateInputType
  }

  export type GetUserProfileAggregateType<T extends UserProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProfile[P]>
      : GetScalarType<T[P], AggregateUserProfile[P]>
  }




  export type UserProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProfileWhereInput
    orderBy?: UserProfileOrderByWithAggregationInput | UserProfileOrderByWithAggregationInput[]
    by: UserProfileScalarFieldEnum[] | UserProfileScalarFieldEnum
    having?: UserProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProfileCountAggregateInputType | true
    _min?: UserProfileMinAggregateInputType
    _max?: UserProfileMaxAggregateInputType
  }

  export type UserProfileGroupByOutputType = {
    id: string
    userId: string
    fullName: string | null
    birthday: Date | null
    gender: $Enums.Gender | null
    country: string | null
    city: string | null
    fullAddress: string | null
    phone: string | null
    _count: UserProfileCountAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  type GetUserProfileGroupByPayload<T extends UserProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
            : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
        }
      >
    >


  export type UserProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    birthday?: boolean
    gender?: boolean
    country?: boolean
    city?: boolean
    fullAddress?: boolean
    phone?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    birthday?: boolean
    gender?: boolean
    country?: boolean
    city?: boolean
    fullAddress?: boolean
    phone?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    birthday?: boolean
    gender?: boolean
    country?: boolean
    city?: boolean
    fullAddress?: boolean
    phone?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    fullName?: boolean
    birthday?: boolean
    gender?: boolean
    country?: boolean
    city?: boolean
    fullAddress?: boolean
    phone?: boolean
  }

  export type UserProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fullName" | "birthday" | "gender" | "country" | "city" | "fullAddress" | "phone", ExtArgs["result"]["userProfile"]>
  export type UserProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fullName: string | null
      birthday: Date | null
      gender: $Enums.Gender | null
      country: string | null
      city: string | null
      fullAddress: string | null
      phone: string | null
    }, ExtArgs["result"]["userProfile"]>
    composites: {}
  }

  type UserProfileGetPayload<S extends boolean | null | undefined | UserProfileDefaultArgs> = $Result.GetResult<Prisma.$UserProfilePayload, S>

  type UserProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProfileCountAggregateInputType | true
    }

  export interface UserProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProfile'], meta: { name: 'UserProfile' } }
    /**
     * Find zero or one UserProfile that matches the filter.
     * @param {UserProfileFindUniqueArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProfileFindUniqueArgs>(args: SelectSubset<T, UserProfileFindUniqueArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProfileFindUniqueOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProfileFindFirstArgs>(args?: SelectSubset<T, UserProfileFindFirstArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProfiles
     * const userProfiles = await prisma.userProfile.findMany()
     * 
     * // Get first 10 UserProfiles
     * const userProfiles = await prisma.userProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProfileFindManyArgs>(args?: SelectSubset<T, UserProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProfile.
     * @param {UserProfileCreateArgs} args - Arguments to create a UserProfile.
     * @example
     * // Create one UserProfile
     * const UserProfile = await prisma.userProfile.create({
     *   data: {
     *     // ... data to create a UserProfile
     *   }
     * })
     * 
     */
    create<T extends UserProfileCreateArgs>(args: SelectSubset<T, UserProfileCreateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProfiles.
     * @param {UserProfileCreateManyArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProfileCreateManyArgs>(args?: SelectSubset<T, UserProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProfiles and returns the data saved in the database.
     * @param {UserProfileCreateManyAndReturnArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProfile.
     * @param {UserProfileDeleteArgs} args - Arguments to delete one UserProfile.
     * @example
     * // Delete one UserProfile
     * const UserProfile = await prisma.userProfile.delete({
     *   where: {
     *     // ... filter to delete one UserProfile
     *   }
     * })
     * 
     */
    delete<T extends UserProfileDeleteArgs>(args: SelectSubset<T, UserProfileDeleteArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProfile.
     * @param {UserProfileUpdateArgs} args - Arguments to update one UserProfile.
     * @example
     * // Update one UserProfile
     * const userProfile = await prisma.userProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProfileUpdateArgs>(args: SelectSubset<T, UserProfileUpdateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProfiles.
     * @param {UserProfileDeleteManyArgs} args - Arguments to filter UserProfiles to delete.
     * @example
     * // Delete a few UserProfiles
     * const { count } = await prisma.userProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProfileDeleteManyArgs>(args?: SelectSubset<T, UserProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProfileUpdateManyArgs>(args: SelectSubset<T, UserProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles and returns the data updated in the database.
     * @param {UserProfileUpdateManyAndReturnArgs} args - Arguments to update many UserProfiles.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProfile.
     * @param {UserProfileUpsertArgs} args - Arguments to update or create a UserProfile.
     * @example
     * // Update or create a UserProfile
     * const userProfile = await prisma.userProfile.upsert({
     *   create: {
     *     // ... data to create a UserProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProfile we want to update
     *   }
     * })
     */
    upsert<T extends UserProfileUpsertArgs>(args: SelectSubset<T, UserProfileUpsertArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileCountArgs} args - Arguments to filter UserProfiles to count.
     * @example
     * // Count the number of UserProfiles
     * const count = await prisma.userProfile.count({
     *   where: {
     *     // ... the filter for the UserProfiles we want to count
     *   }
     * })
    **/
    count<T extends UserProfileCountArgs>(
      args?: Subset<T, UserProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProfileAggregateArgs>(args: Subset<T, UserProfileAggregateArgs>): Prisma.PrismaPromise<GetUserProfileAggregateType<T>>

    /**
     * Group by UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProfileGroupByArgs['orderBy'] }
        : { orderBy?: UserProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProfile model
   */
  readonly fields: UserProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProfile model
   */
  interface UserProfileFieldRefs {
    readonly id: FieldRef<"UserProfile", 'String'>
    readonly userId: FieldRef<"UserProfile", 'String'>
    readonly fullName: FieldRef<"UserProfile", 'String'>
    readonly birthday: FieldRef<"UserProfile", 'DateTime'>
    readonly gender: FieldRef<"UserProfile", 'Gender'>
    readonly country: FieldRef<"UserProfile", 'String'>
    readonly city: FieldRef<"UserProfile", 'String'>
    readonly fullAddress: FieldRef<"UserProfile", 'String'>
    readonly phone: FieldRef<"UserProfile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserProfile findUnique
   */
  export type UserProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findUniqueOrThrow
   */
  export type UserProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findFirst
   */
  export type UserProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findFirstOrThrow
   */
  export type UserProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findMany
   */
  export type UserProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfiles to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile create
   */
  export type UserProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a UserProfile.
     */
    data: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
  }

  /**
   * UserProfile createMany
   */
  export type UserProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile createManyAndReturn
   */
  export type UserProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProfile update
   */
  export type UserProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a UserProfile.
     */
    data: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
    /**
     * Choose, which UserProfile to update.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile updateMany
   */
  export type UserProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile updateManyAndReturn
   */
  export type UserProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProfile upsert
   */
  export type UserProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the UserProfile to update in case it exists.
     */
    where: UserProfileWhereUniqueInput
    /**
     * In case the UserProfile found by the `where` argument doesn't exist, create a new UserProfile with this data.
     */
    create: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
    /**
     * In case the UserProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
  }

  /**
   * UserProfile delete
   */
  export type UserProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter which UserProfile to delete.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile deleteMany
   */
  export type UserProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfiles to delete
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to delete.
     */
    limit?: number
  }

  /**
   * UserProfile without action
   */
  export type UserProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
  }


  /**
   * Model PsychologistProfile
   */

  export type AggregatePsychologistProfile = {
    _count: PsychologistProfileCountAggregateOutputType | null
    _min: PsychologistProfileMinAggregateOutputType | null
    _max: PsychologistProfileMaxAggregateOutputType | null
  }

  export type PsychologistProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    sipp: string | null
    str: string | null
    about: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PsychologistProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    sipp: string | null
    str: string | null
    about: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PsychologistProfileCountAggregateOutputType = {
    id: number
    userId: number
    fullName: number
    sipp: number
    str: number
    about: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PsychologistProfileMinAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    sipp?: true
    str?: true
    about?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PsychologistProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    sipp?: true
    str?: true
    about?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PsychologistProfileCountAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    sipp?: true
    str?: true
    about?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PsychologistProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PsychologistProfile to aggregate.
     */
    where?: PsychologistProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PsychologistProfiles to fetch.
     */
    orderBy?: PsychologistProfileOrderByWithRelationInput | PsychologistProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PsychologistProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PsychologistProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PsychologistProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PsychologistProfiles
    **/
    _count?: true | PsychologistProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PsychologistProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PsychologistProfileMaxAggregateInputType
  }

  export type GetPsychologistProfileAggregateType<T extends PsychologistProfileAggregateArgs> = {
        [P in keyof T & keyof AggregatePsychologistProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePsychologistProfile[P]>
      : GetScalarType<T[P], AggregatePsychologistProfile[P]>
  }




  export type PsychologistProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PsychologistProfileWhereInput
    orderBy?: PsychologistProfileOrderByWithAggregationInput | PsychologistProfileOrderByWithAggregationInput[]
    by: PsychologistProfileScalarFieldEnum[] | PsychologistProfileScalarFieldEnum
    having?: PsychologistProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PsychologistProfileCountAggregateInputType | true
    _min?: PsychologistProfileMinAggregateInputType
    _max?: PsychologistProfileMaxAggregateInputType
  }

  export type PsychologistProfileGroupByOutputType = {
    id: string
    userId: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: PsychologistProfileCountAggregateOutputType | null
    _min: PsychologistProfileMinAggregateOutputType | null
    _max: PsychologistProfileMaxAggregateOutputType | null
  }

  type GetPsychologistProfileGroupByPayload<T extends PsychologistProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PsychologistProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PsychologistProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PsychologistProfileGroupByOutputType[P]>
            : GetScalarType<T[P], PsychologistProfileGroupByOutputType[P]>
        }
      >
    >


  export type PsychologistProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    sipp?: boolean
    str?: boolean
    about?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    educations?: boolean | PsychologistProfile$educationsArgs<ExtArgs>
    experiences?: boolean | PsychologistProfile$experiencesArgs<ExtArgs>
    specializations?: boolean | PsychologistProfile$specializationsArgs<ExtArgs>
    expertises?: boolean | PsychologistProfile$expertisesArgs<ExtArgs>
    schedules?: boolean | PsychologistProfile$schedulesArgs<ExtArgs>
    sessionNotes?: boolean | PsychologistProfile$sessionNotesArgs<ExtArgs>
    _count?: boolean | PsychologistProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["psychologistProfile"]>

  export type PsychologistProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    sipp?: boolean
    str?: boolean
    about?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["psychologistProfile"]>

  export type PsychologistProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    sipp?: boolean
    str?: boolean
    about?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["psychologistProfile"]>

  export type PsychologistProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    fullName?: boolean
    sipp?: boolean
    str?: boolean
    about?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PsychologistProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fullName" | "sipp" | "str" | "about" | "avatarUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["psychologistProfile"]>
  export type PsychologistProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    educations?: boolean | PsychologistProfile$educationsArgs<ExtArgs>
    experiences?: boolean | PsychologistProfile$experiencesArgs<ExtArgs>
    specializations?: boolean | PsychologistProfile$specializationsArgs<ExtArgs>
    expertises?: boolean | PsychologistProfile$expertisesArgs<ExtArgs>
    schedules?: boolean | PsychologistProfile$schedulesArgs<ExtArgs>
    sessionNotes?: boolean | PsychologistProfile$sessionNotesArgs<ExtArgs>
    _count?: boolean | PsychologistProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PsychologistProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PsychologistProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PsychologistProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PsychologistProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      educations: Prisma.$EducationPayload<ExtArgs>[]
      experiences: Prisma.$ExperiencePayload<ExtArgs>[]
      specializations: Prisma.$SpecializationPayload<ExtArgs>[]
      expertises: Prisma.$ExpertisePayload<ExtArgs>[]
      schedules: Prisma.$SchedulePayload<ExtArgs>[]
      sessionNotes: Prisma.$SessionNotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fullName: string
      sipp: string
      str: string
      about: string
      avatarUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["psychologistProfile"]>
    composites: {}
  }

  type PsychologistProfileGetPayload<S extends boolean | null | undefined | PsychologistProfileDefaultArgs> = $Result.GetResult<Prisma.$PsychologistProfilePayload, S>

  type PsychologistProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PsychologistProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PsychologistProfileCountAggregateInputType | true
    }

  export interface PsychologistProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PsychologistProfile'], meta: { name: 'PsychologistProfile' } }
    /**
     * Find zero or one PsychologistProfile that matches the filter.
     * @param {PsychologistProfileFindUniqueArgs} args - Arguments to find a PsychologistProfile
     * @example
     * // Get one PsychologistProfile
     * const psychologistProfile = await prisma.psychologistProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PsychologistProfileFindUniqueArgs>(args: SelectSubset<T, PsychologistProfileFindUniqueArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PsychologistProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PsychologistProfileFindUniqueOrThrowArgs} args - Arguments to find a PsychologistProfile
     * @example
     * // Get one PsychologistProfile
     * const psychologistProfile = await prisma.psychologistProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PsychologistProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, PsychologistProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PsychologistProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistProfileFindFirstArgs} args - Arguments to find a PsychologistProfile
     * @example
     * // Get one PsychologistProfile
     * const psychologistProfile = await prisma.psychologistProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PsychologistProfileFindFirstArgs>(args?: SelectSubset<T, PsychologistProfileFindFirstArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PsychologistProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistProfileFindFirstOrThrowArgs} args - Arguments to find a PsychologistProfile
     * @example
     * // Get one PsychologistProfile
     * const psychologistProfile = await prisma.psychologistProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PsychologistProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, PsychologistProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PsychologistProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PsychologistProfiles
     * const psychologistProfiles = await prisma.psychologistProfile.findMany()
     * 
     * // Get first 10 PsychologistProfiles
     * const psychologistProfiles = await prisma.psychologistProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const psychologistProfileWithIdOnly = await prisma.psychologistProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PsychologistProfileFindManyArgs>(args?: SelectSubset<T, PsychologistProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PsychologistProfile.
     * @param {PsychologistProfileCreateArgs} args - Arguments to create a PsychologistProfile.
     * @example
     * // Create one PsychologistProfile
     * const PsychologistProfile = await prisma.psychologistProfile.create({
     *   data: {
     *     // ... data to create a PsychologistProfile
     *   }
     * })
     * 
     */
    create<T extends PsychologistProfileCreateArgs>(args: SelectSubset<T, PsychologistProfileCreateArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PsychologistProfiles.
     * @param {PsychologistProfileCreateManyArgs} args - Arguments to create many PsychologistProfiles.
     * @example
     * // Create many PsychologistProfiles
     * const psychologistProfile = await prisma.psychologistProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PsychologistProfileCreateManyArgs>(args?: SelectSubset<T, PsychologistProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PsychologistProfiles and returns the data saved in the database.
     * @param {PsychologistProfileCreateManyAndReturnArgs} args - Arguments to create many PsychologistProfiles.
     * @example
     * // Create many PsychologistProfiles
     * const psychologistProfile = await prisma.psychologistProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PsychologistProfiles and only return the `id`
     * const psychologistProfileWithIdOnly = await prisma.psychologistProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PsychologistProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, PsychologistProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PsychologistProfile.
     * @param {PsychologistProfileDeleteArgs} args - Arguments to delete one PsychologistProfile.
     * @example
     * // Delete one PsychologistProfile
     * const PsychologistProfile = await prisma.psychologistProfile.delete({
     *   where: {
     *     // ... filter to delete one PsychologistProfile
     *   }
     * })
     * 
     */
    delete<T extends PsychologistProfileDeleteArgs>(args: SelectSubset<T, PsychologistProfileDeleteArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PsychologistProfile.
     * @param {PsychologistProfileUpdateArgs} args - Arguments to update one PsychologistProfile.
     * @example
     * // Update one PsychologistProfile
     * const psychologistProfile = await prisma.psychologistProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PsychologistProfileUpdateArgs>(args: SelectSubset<T, PsychologistProfileUpdateArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PsychologistProfiles.
     * @param {PsychologistProfileDeleteManyArgs} args - Arguments to filter PsychologistProfiles to delete.
     * @example
     * // Delete a few PsychologistProfiles
     * const { count } = await prisma.psychologistProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PsychologistProfileDeleteManyArgs>(args?: SelectSubset<T, PsychologistProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PsychologistProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PsychologistProfiles
     * const psychologistProfile = await prisma.psychologistProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PsychologistProfileUpdateManyArgs>(args: SelectSubset<T, PsychologistProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PsychologistProfiles and returns the data updated in the database.
     * @param {PsychologistProfileUpdateManyAndReturnArgs} args - Arguments to update many PsychologistProfiles.
     * @example
     * // Update many PsychologistProfiles
     * const psychologistProfile = await prisma.psychologistProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PsychologistProfiles and only return the `id`
     * const psychologistProfileWithIdOnly = await prisma.psychologistProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PsychologistProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, PsychologistProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PsychologistProfile.
     * @param {PsychologistProfileUpsertArgs} args - Arguments to update or create a PsychologistProfile.
     * @example
     * // Update or create a PsychologistProfile
     * const psychologistProfile = await prisma.psychologistProfile.upsert({
     *   create: {
     *     // ... data to create a PsychologistProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PsychologistProfile we want to update
     *   }
     * })
     */
    upsert<T extends PsychologistProfileUpsertArgs>(args: SelectSubset<T, PsychologistProfileUpsertArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PsychologistProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistProfileCountArgs} args - Arguments to filter PsychologistProfiles to count.
     * @example
     * // Count the number of PsychologistProfiles
     * const count = await prisma.psychologistProfile.count({
     *   where: {
     *     // ... the filter for the PsychologistProfiles we want to count
     *   }
     * })
    **/
    count<T extends PsychologistProfileCountArgs>(
      args?: Subset<T, PsychologistProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PsychologistProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PsychologistProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PsychologistProfileAggregateArgs>(args: Subset<T, PsychologistProfileAggregateArgs>): Prisma.PrismaPromise<GetPsychologistProfileAggregateType<T>>

    /**
     * Group by PsychologistProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PsychologistProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PsychologistProfileGroupByArgs['orderBy'] }
        : { orderBy?: PsychologistProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PsychologistProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPsychologistProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PsychologistProfile model
   */
  readonly fields: PsychologistProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PsychologistProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PsychologistProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    educations<T extends PsychologistProfile$educationsArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistProfile$educationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    experiences<T extends PsychologistProfile$experiencesArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistProfile$experiencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    specializations<T extends PsychologistProfile$specializationsArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistProfile$specializationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecializationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expertises<T extends PsychologistProfile$expertisesArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistProfile$expertisesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpertisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    schedules<T extends PsychologistProfile$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistProfile$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessionNotes<T extends PsychologistProfile$sessionNotesArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistProfile$sessionNotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PsychologistProfile model
   */
  interface PsychologistProfileFieldRefs {
    readonly id: FieldRef<"PsychologistProfile", 'String'>
    readonly userId: FieldRef<"PsychologistProfile", 'String'>
    readonly fullName: FieldRef<"PsychologistProfile", 'String'>
    readonly sipp: FieldRef<"PsychologistProfile", 'String'>
    readonly str: FieldRef<"PsychologistProfile", 'String'>
    readonly about: FieldRef<"PsychologistProfile", 'String'>
    readonly avatarUrl: FieldRef<"PsychologistProfile", 'String'>
    readonly createdAt: FieldRef<"PsychologistProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"PsychologistProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PsychologistProfile findUnique
   */
  export type PsychologistProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfile
     */
    select?: PsychologistProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PsychologistProfile
     */
    omit?: PsychologistProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistProfileInclude<ExtArgs> | null
    /**
     * Filter, which PsychologistProfile to fetch.
     */
    where: PsychologistProfileWhereUniqueInput
  }

  /**
   * PsychologistProfile findUniqueOrThrow
   */
  export type PsychologistProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfile
     */
    select?: PsychologistProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PsychologistProfile
     */
    omit?: PsychologistProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistProfileInclude<ExtArgs> | null
    /**
     * Filter, which PsychologistProfile to fetch.
     */
    where: PsychologistProfileWhereUniqueInput
  }

  /**
   * PsychologistProfile findFirst
   */
  export type PsychologistProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfile
     */
    select?: PsychologistProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PsychologistProfile
     */
    omit?: PsychologistProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistProfileInclude<ExtArgs> | null
    /**
     * Filter, which PsychologistProfile to fetch.
     */
    where?: PsychologistProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PsychologistProfiles to fetch.
     */
    orderBy?: PsychologistProfileOrderByWithRelationInput | PsychologistProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PsychologistProfiles.
     */
    cursor?: PsychologistProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PsychologistProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PsychologistProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PsychologistProfiles.
     */
    distinct?: PsychologistProfileScalarFieldEnum | PsychologistProfileScalarFieldEnum[]
  }

  /**
   * PsychologistProfile findFirstOrThrow
   */
  export type PsychologistProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfile
     */
    select?: PsychologistProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PsychologistProfile
     */
    omit?: PsychologistProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistProfileInclude<ExtArgs> | null
    /**
     * Filter, which PsychologistProfile to fetch.
     */
    where?: PsychologistProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PsychologistProfiles to fetch.
     */
    orderBy?: PsychologistProfileOrderByWithRelationInput | PsychologistProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PsychologistProfiles.
     */
    cursor?: PsychologistProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PsychologistProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PsychologistProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PsychologistProfiles.
     */
    distinct?: PsychologistProfileScalarFieldEnum | PsychologistProfileScalarFieldEnum[]
  }

  /**
   * PsychologistProfile findMany
   */
  export type PsychologistProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfile
     */
    select?: PsychologistProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PsychologistProfile
     */
    omit?: PsychologistProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistProfileInclude<ExtArgs> | null
    /**
     * Filter, which PsychologistProfiles to fetch.
     */
    where?: PsychologistProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PsychologistProfiles to fetch.
     */
    orderBy?: PsychologistProfileOrderByWithRelationInput | PsychologistProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PsychologistProfiles.
     */
    cursor?: PsychologistProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PsychologistProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PsychologistProfiles.
     */
    skip?: number
    distinct?: PsychologistProfileScalarFieldEnum | PsychologistProfileScalarFieldEnum[]
  }

  /**
   * PsychologistProfile create
   */
  export type PsychologistProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfile
     */
    select?: PsychologistProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PsychologistProfile
     */
    omit?: PsychologistProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a PsychologistProfile.
     */
    data: XOR<PsychologistProfileCreateInput, PsychologistProfileUncheckedCreateInput>
  }

  /**
   * PsychologistProfile createMany
   */
  export type PsychologistProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PsychologistProfiles.
     */
    data: PsychologistProfileCreateManyInput | PsychologistProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PsychologistProfile createManyAndReturn
   */
  export type PsychologistProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfile
     */
    select?: PsychologistProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PsychologistProfile
     */
    omit?: PsychologistProfileOmit<ExtArgs> | null
    /**
     * The data used to create many PsychologistProfiles.
     */
    data: PsychologistProfileCreateManyInput | PsychologistProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PsychologistProfile update
   */
  export type PsychologistProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfile
     */
    select?: PsychologistProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PsychologistProfile
     */
    omit?: PsychologistProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a PsychologistProfile.
     */
    data: XOR<PsychologistProfileUpdateInput, PsychologistProfileUncheckedUpdateInput>
    /**
     * Choose, which PsychologistProfile to update.
     */
    where: PsychologistProfileWhereUniqueInput
  }

  /**
   * PsychologistProfile updateMany
   */
  export type PsychologistProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PsychologistProfiles.
     */
    data: XOR<PsychologistProfileUpdateManyMutationInput, PsychologistProfileUncheckedUpdateManyInput>
    /**
     * Filter which PsychologistProfiles to update
     */
    where?: PsychologistProfileWhereInput
    /**
     * Limit how many PsychologistProfiles to update.
     */
    limit?: number
  }

  /**
   * PsychologistProfile updateManyAndReturn
   */
  export type PsychologistProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfile
     */
    select?: PsychologistProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PsychologistProfile
     */
    omit?: PsychologistProfileOmit<ExtArgs> | null
    /**
     * The data used to update PsychologistProfiles.
     */
    data: XOR<PsychologistProfileUpdateManyMutationInput, PsychologistProfileUncheckedUpdateManyInput>
    /**
     * Filter which PsychologistProfiles to update
     */
    where?: PsychologistProfileWhereInput
    /**
     * Limit how many PsychologistProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PsychologistProfile upsert
   */
  export type PsychologistProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfile
     */
    select?: PsychologistProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PsychologistProfile
     */
    omit?: PsychologistProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the PsychologistProfile to update in case it exists.
     */
    where: PsychologistProfileWhereUniqueInput
    /**
     * In case the PsychologistProfile found by the `where` argument doesn't exist, create a new PsychologistProfile with this data.
     */
    create: XOR<PsychologistProfileCreateInput, PsychologistProfileUncheckedCreateInput>
    /**
     * In case the PsychologistProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PsychologistProfileUpdateInput, PsychologistProfileUncheckedUpdateInput>
  }

  /**
   * PsychologistProfile delete
   */
  export type PsychologistProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfile
     */
    select?: PsychologistProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PsychologistProfile
     */
    omit?: PsychologistProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistProfileInclude<ExtArgs> | null
    /**
     * Filter which PsychologistProfile to delete.
     */
    where: PsychologistProfileWhereUniqueInput
  }

  /**
   * PsychologistProfile deleteMany
   */
  export type PsychologistProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PsychologistProfiles to delete
     */
    where?: PsychologistProfileWhereInput
    /**
     * Limit how many PsychologistProfiles to delete.
     */
    limit?: number
  }

  /**
   * PsychologistProfile.educations
   */
  export type PsychologistProfile$educationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    where?: EducationWhereInput
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    cursor?: EducationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * PsychologistProfile.experiences
   */
  export type PsychologistProfile$experiencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    where?: ExperienceWhereInput
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    cursor?: ExperienceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * PsychologistProfile.specializations
   */
  export type PsychologistProfile$specializationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialization
     */
    select?: SpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialization
     */
    omit?: SpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecializationInclude<ExtArgs> | null
    where?: SpecializationWhereInput
    orderBy?: SpecializationOrderByWithRelationInput | SpecializationOrderByWithRelationInput[]
    cursor?: SpecializationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpecializationScalarFieldEnum | SpecializationScalarFieldEnum[]
  }

  /**
   * PsychologistProfile.expertises
   */
  export type PsychologistProfile$expertisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expertise
     */
    select?: ExpertiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expertise
     */
    omit?: ExpertiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpertiseInclude<ExtArgs> | null
    where?: ExpertiseWhereInput
    orderBy?: ExpertiseOrderByWithRelationInput | ExpertiseOrderByWithRelationInput[]
    cursor?: ExpertiseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpertiseScalarFieldEnum | ExpertiseScalarFieldEnum[]
  }

  /**
   * PsychologistProfile.schedules
   */
  export type PsychologistProfile$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    cursor?: ScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * PsychologistProfile.sessionNotes
   */
  export type PsychologistProfile$sessionNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteInclude<ExtArgs> | null
    where?: SessionNoteWhereInput
    orderBy?: SessionNoteOrderByWithRelationInput | SessionNoteOrderByWithRelationInput[]
    cursor?: SessionNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionNoteScalarFieldEnum | SessionNoteScalarFieldEnum[]
  }

  /**
   * PsychologistProfile without action
   */
  export type PsychologistProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistProfile
     */
    select?: PsychologistProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PsychologistProfile
     */
    omit?: PsychologistProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistProfileInclude<ExtArgs> | null
  }


  /**
   * Model Education
   */

  export type AggregateEducation = {
    _count: EducationCountAggregateOutputType | null
    _avg: EducationAvgAggregateOutputType | null
    _sum: EducationSumAggregateOutputType | null
    _min: EducationMinAggregateOutputType | null
    _max: EducationMaxAggregateOutputType | null
  }

  export type EducationAvgAggregateOutputType = {
    startYear: number | null
    endYear: number | null
  }

  export type EducationSumAggregateOutputType = {
    startYear: number | null
    endYear: number | null
  }

  export type EducationMinAggregateOutputType = {
    id: string | null
    psychologistId: string | null
    degree: string | null
    institution: string | null
    city: string | null
    startYear: number | null
    endYear: number | null
    createdAt: Date | null
  }

  export type EducationMaxAggregateOutputType = {
    id: string | null
    psychologistId: string | null
    degree: string | null
    institution: string | null
    city: string | null
    startYear: number | null
    endYear: number | null
    createdAt: Date | null
  }

  export type EducationCountAggregateOutputType = {
    id: number
    psychologistId: number
    degree: number
    institution: number
    city: number
    startYear: number
    endYear: number
    createdAt: number
    _all: number
  }


  export type EducationAvgAggregateInputType = {
    startYear?: true
    endYear?: true
  }

  export type EducationSumAggregateInputType = {
    startYear?: true
    endYear?: true
  }

  export type EducationMinAggregateInputType = {
    id?: true
    psychologistId?: true
    degree?: true
    institution?: true
    city?: true
    startYear?: true
    endYear?: true
    createdAt?: true
  }

  export type EducationMaxAggregateInputType = {
    id?: true
    psychologistId?: true
    degree?: true
    institution?: true
    city?: true
    startYear?: true
    endYear?: true
    createdAt?: true
  }

  export type EducationCountAggregateInputType = {
    id?: true
    psychologistId?: true
    degree?: true
    institution?: true
    city?: true
    startYear?: true
    endYear?: true
    createdAt?: true
    _all?: true
  }

  export type EducationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Education to aggregate.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Educations
    **/
    _count?: true | EducationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EducationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EducationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EducationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EducationMaxAggregateInputType
  }

  export type GetEducationAggregateType<T extends EducationAggregateArgs> = {
        [P in keyof T & keyof AggregateEducation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEducation[P]>
      : GetScalarType<T[P], AggregateEducation[P]>
  }




  export type EducationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EducationWhereInput
    orderBy?: EducationOrderByWithAggregationInput | EducationOrderByWithAggregationInput[]
    by: EducationScalarFieldEnum[] | EducationScalarFieldEnum
    having?: EducationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EducationCountAggregateInputType | true
    _avg?: EducationAvgAggregateInputType
    _sum?: EducationSumAggregateInputType
    _min?: EducationMinAggregateInputType
    _max?: EducationMaxAggregateInputType
  }

  export type EducationGroupByOutputType = {
    id: string
    psychologistId: string
    degree: string
    institution: string
    city: string
    startYear: number
    endYear: number
    createdAt: Date
    _count: EducationCountAggregateOutputType | null
    _avg: EducationAvgAggregateOutputType | null
    _sum: EducationSumAggregateOutputType | null
    _min: EducationMinAggregateOutputType | null
    _max: EducationMaxAggregateOutputType | null
  }

  type GetEducationGroupByPayload<T extends EducationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EducationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EducationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EducationGroupByOutputType[P]>
            : GetScalarType<T[P], EducationGroupByOutputType[P]>
        }
      >
    >


  export type EducationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    degree?: boolean
    institution?: boolean
    city?: boolean
    startYear?: boolean
    endYear?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["education"]>

  export type EducationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    degree?: boolean
    institution?: boolean
    city?: boolean
    startYear?: boolean
    endYear?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["education"]>

  export type EducationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    degree?: boolean
    institution?: boolean
    city?: boolean
    startYear?: boolean
    endYear?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["education"]>

  export type EducationSelectScalar = {
    id?: boolean
    psychologistId?: boolean
    degree?: boolean
    institution?: boolean
    city?: boolean
    startYear?: boolean
    endYear?: boolean
    createdAt?: boolean
  }

  export type EducationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "psychologistId" | "degree" | "institution" | "city" | "startYear" | "endYear" | "createdAt", ExtArgs["result"]["education"]>
  export type EducationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }
  export type EducationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }
  export type EducationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }

  export type $EducationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Education"
    objects: {
      psychologist: Prisma.$PsychologistProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      psychologistId: string
      degree: string
      institution: string
      city: string
      startYear: number
      endYear: number
      createdAt: Date
    }, ExtArgs["result"]["education"]>
    composites: {}
  }

  type EducationGetPayload<S extends boolean | null | undefined | EducationDefaultArgs> = $Result.GetResult<Prisma.$EducationPayload, S>

  type EducationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EducationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EducationCountAggregateInputType | true
    }

  export interface EducationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Education'], meta: { name: 'Education' } }
    /**
     * Find zero or one Education that matches the filter.
     * @param {EducationFindUniqueArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EducationFindUniqueArgs>(args: SelectSubset<T, EducationFindUniqueArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Education that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EducationFindUniqueOrThrowArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EducationFindUniqueOrThrowArgs>(args: SelectSubset<T, EducationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Education that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindFirstArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EducationFindFirstArgs>(args?: SelectSubset<T, EducationFindFirstArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Education that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindFirstOrThrowArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EducationFindFirstOrThrowArgs>(args?: SelectSubset<T, EducationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Educations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Educations
     * const educations = await prisma.education.findMany()
     * 
     * // Get first 10 Educations
     * const educations = await prisma.education.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const educationWithIdOnly = await prisma.education.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EducationFindManyArgs>(args?: SelectSubset<T, EducationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Education.
     * @param {EducationCreateArgs} args - Arguments to create a Education.
     * @example
     * // Create one Education
     * const Education = await prisma.education.create({
     *   data: {
     *     // ... data to create a Education
     *   }
     * })
     * 
     */
    create<T extends EducationCreateArgs>(args: SelectSubset<T, EducationCreateArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Educations.
     * @param {EducationCreateManyArgs} args - Arguments to create many Educations.
     * @example
     * // Create many Educations
     * const education = await prisma.education.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EducationCreateManyArgs>(args?: SelectSubset<T, EducationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Educations and returns the data saved in the database.
     * @param {EducationCreateManyAndReturnArgs} args - Arguments to create many Educations.
     * @example
     * // Create many Educations
     * const education = await prisma.education.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Educations and only return the `id`
     * const educationWithIdOnly = await prisma.education.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EducationCreateManyAndReturnArgs>(args?: SelectSubset<T, EducationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Education.
     * @param {EducationDeleteArgs} args - Arguments to delete one Education.
     * @example
     * // Delete one Education
     * const Education = await prisma.education.delete({
     *   where: {
     *     // ... filter to delete one Education
     *   }
     * })
     * 
     */
    delete<T extends EducationDeleteArgs>(args: SelectSubset<T, EducationDeleteArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Education.
     * @param {EducationUpdateArgs} args - Arguments to update one Education.
     * @example
     * // Update one Education
     * const education = await prisma.education.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EducationUpdateArgs>(args: SelectSubset<T, EducationUpdateArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Educations.
     * @param {EducationDeleteManyArgs} args - Arguments to filter Educations to delete.
     * @example
     * // Delete a few Educations
     * const { count } = await prisma.education.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EducationDeleteManyArgs>(args?: SelectSubset<T, EducationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Educations
     * const education = await prisma.education.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EducationUpdateManyArgs>(args: SelectSubset<T, EducationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Educations and returns the data updated in the database.
     * @param {EducationUpdateManyAndReturnArgs} args - Arguments to update many Educations.
     * @example
     * // Update many Educations
     * const education = await prisma.education.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Educations and only return the `id`
     * const educationWithIdOnly = await prisma.education.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EducationUpdateManyAndReturnArgs>(args: SelectSubset<T, EducationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Education.
     * @param {EducationUpsertArgs} args - Arguments to update or create a Education.
     * @example
     * // Update or create a Education
     * const education = await prisma.education.upsert({
     *   create: {
     *     // ... data to create a Education
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Education we want to update
     *   }
     * })
     */
    upsert<T extends EducationUpsertArgs>(args: SelectSubset<T, EducationUpsertArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationCountArgs} args - Arguments to filter Educations to count.
     * @example
     * // Count the number of Educations
     * const count = await prisma.education.count({
     *   where: {
     *     // ... the filter for the Educations we want to count
     *   }
     * })
    **/
    count<T extends EducationCountArgs>(
      args?: Subset<T, EducationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EducationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Education.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EducationAggregateArgs>(args: Subset<T, EducationAggregateArgs>): Prisma.PrismaPromise<GetEducationAggregateType<T>>

    /**
     * Group by Education.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EducationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EducationGroupByArgs['orderBy'] }
        : { orderBy?: EducationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EducationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEducationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Education model
   */
  readonly fields: EducationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Education.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EducationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    psychologist<T extends PsychologistProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistProfileDefaultArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Education model
   */
  interface EducationFieldRefs {
    readonly id: FieldRef<"Education", 'String'>
    readonly psychologistId: FieldRef<"Education", 'String'>
    readonly degree: FieldRef<"Education", 'String'>
    readonly institution: FieldRef<"Education", 'String'>
    readonly city: FieldRef<"Education", 'String'>
    readonly startYear: FieldRef<"Education", 'Int'>
    readonly endYear: FieldRef<"Education", 'Int'>
    readonly createdAt: FieldRef<"Education", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Education findUnique
   */
  export type EducationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education findUniqueOrThrow
   */
  export type EducationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education findFirst
   */
  export type EducationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Educations.
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Educations.
     */
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * Education findFirstOrThrow
   */
  export type EducationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Educations.
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Educations.
     */
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * Education findMany
   */
  export type EducationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * Filter, which Educations to fetch.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Educations.
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * Education create
   */
  export type EducationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * The data needed to create a Education.
     */
    data: XOR<EducationCreateInput, EducationUncheckedCreateInput>
  }

  /**
   * Education createMany
   */
  export type EducationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Educations.
     */
    data: EducationCreateManyInput | EducationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Education createManyAndReturn
   */
  export type EducationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The data used to create many Educations.
     */
    data: EducationCreateManyInput | EducationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Education update
   */
  export type EducationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * The data needed to update a Education.
     */
    data: XOR<EducationUpdateInput, EducationUncheckedUpdateInput>
    /**
     * Choose, which Education to update.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education updateMany
   */
  export type EducationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Educations.
     */
    data: XOR<EducationUpdateManyMutationInput, EducationUncheckedUpdateManyInput>
    /**
     * Filter which Educations to update
     */
    where?: EducationWhereInput
    /**
     * Limit how many Educations to update.
     */
    limit?: number
  }

  /**
   * Education updateManyAndReturn
   */
  export type EducationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The data used to update Educations.
     */
    data: XOR<EducationUpdateManyMutationInput, EducationUncheckedUpdateManyInput>
    /**
     * Filter which Educations to update
     */
    where?: EducationWhereInput
    /**
     * Limit how many Educations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Education upsert
   */
  export type EducationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * The filter to search for the Education to update in case it exists.
     */
    where: EducationWhereUniqueInput
    /**
     * In case the Education found by the `where` argument doesn't exist, create a new Education with this data.
     */
    create: XOR<EducationCreateInput, EducationUncheckedCreateInput>
    /**
     * In case the Education was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EducationUpdateInput, EducationUncheckedUpdateInput>
  }

  /**
   * Education delete
   */
  export type EducationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * Filter which Education to delete.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education deleteMany
   */
  export type EducationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Educations to delete
     */
    where?: EducationWhereInput
    /**
     * Limit how many Educations to delete.
     */
    limit?: number
  }

  /**
   * Education without action
   */
  export type EducationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
  }


  /**
   * Model Experience
   */

  export type AggregateExperience = {
    _count: ExperienceCountAggregateOutputType | null
    _min: ExperienceMinAggregateOutputType | null
    _max: ExperienceMaxAggregateOutputType | null
  }

  export type ExperienceMinAggregateOutputType = {
    id: string | null
    psychologistId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type ExperienceMaxAggregateOutputType = {
    id: string | null
    psychologistId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type ExperienceCountAggregateOutputType = {
    id: number
    psychologistId: number
    name: number
    createdAt: number
    _all: number
  }


  export type ExperienceMinAggregateInputType = {
    id?: true
    psychologistId?: true
    name?: true
    createdAt?: true
  }

  export type ExperienceMaxAggregateInputType = {
    id?: true
    psychologistId?: true
    name?: true
    createdAt?: true
  }

  export type ExperienceCountAggregateInputType = {
    id?: true
    psychologistId?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type ExperienceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Experience to aggregate.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Experiences
    **/
    _count?: true | ExperienceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExperienceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExperienceMaxAggregateInputType
  }

  export type GetExperienceAggregateType<T extends ExperienceAggregateArgs> = {
        [P in keyof T & keyof AggregateExperience]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExperience[P]>
      : GetScalarType<T[P], AggregateExperience[P]>
  }




  export type ExperienceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperienceWhereInput
    orderBy?: ExperienceOrderByWithAggregationInput | ExperienceOrderByWithAggregationInput[]
    by: ExperienceScalarFieldEnum[] | ExperienceScalarFieldEnum
    having?: ExperienceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExperienceCountAggregateInputType | true
    _min?: ExperienceMinAggregateInputType
    _max?: ExperienceMaxAggregateInputType
  }

  export type ExperienceGroupByOutputType = {
    id: string
    psychologistId: string
    name: string
    createdAt: Date
    _count: ExperienceCountAggregateOutputType | null
    _min: ExperienceMinAggregateOutputType | null
    _max: ExperienceMaxAggregateOutputType | null
  }

  type GetExperienceGroupByPayload<T extends ExperienceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExperienceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExperienceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExperienceGroupByOutputType[P]>
            : GetScalarType<T[P], ExperienceGroupByOutputType[P]>
        }
      >
    >


  export type ExperienceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    name?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experience"]>

  export type ExperienceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    name?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experience"]>

  export type ExperienceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    name?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experience"]>

  export type ExperienceSelectScalar = {
    id?: boolean
    psychologistId?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type ExperienceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "psychologistId" | "name" | "createdAt", ExtArgs["result"]["experience"]>
  export type ExperienceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }
  export type ExperienceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }
  export type ExperienceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }

  export type $ExperiencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Experience"
    objects: {
      psychologist: Prisma.$PsychologistProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      psychologistId: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["experience"]>
    composites: {}
  }

  type ExperienceGetPayload<S extends boolean | null | undefined | ExperienceDefaultArgs> = $Result.GetResult<Prisma.$ExperiencePayload, S>

  type ExperienceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExperienceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExperienceCountAggregateInputType | true
    }

  export interface ExperienceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Experience'], meta: { name: 'Experience' } }
    /**
     * Find zero or one Experience that matches the filter.
     * @param {ExperienceFindUniqueArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExperienceFindUniqueArgs>(args: SelectSubset<T, ExperienceFindUniqueArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Experience that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExperienceFindUniqueOrThrowArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExperienceFindUniqueOrThrowArgs>(args: SelectSubset<T, ExperienceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Experience that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindFirstArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExperienceFindFirstArgs>(args?: SelectSubset<T, ExperienceFindFirstArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Experience that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindFirstOrThrowArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExperienceFindFirstOrThrowArgs>(args?: SelectSubset<T, ExperienceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Experiences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Experiences
     * const experiences = await prisma.experience.findMany()
     * 
     * // Get first 10 Experiences
     * const experiences = await prisma.experience.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const experienceWithIdOnly = await prisma.experience.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExperienceFindManyArgs>(args?: SelectSubset<T, ExperienceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Experience.
     * @param {ExperienceCreateArgs} args - Arguments to create a Experience.
     * @example
     * // Create one Experience
     * const Experience = await prisma.experience.create({
     *   data: {
     *     // ... data to create a Experience
     *   }
     * })
     * 
     */
    create<T extends ExperienceCreateArgs>(args: SelectSubset<T, ExperienceCreateArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Experiences.
     * @param {ExperienceCreateManyArgs} args - Arguments to create many Experiences.
     * @example
     * // Create many Experiences
     * const experience = await prisma.experience.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExperienceCreateManyArgs>(args?: SelectSubset<T, ExperienceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Experiences and returns the data saved in the database.
     * @param {ExperienceCreateManyAndReturnArgs} args - Arguments to create many Experiences.
     * @example
     * // Create many Experiences
     * const experience = await prisma.experience.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Experiences and only return the `id`
     * const experienceWithIdOnly = await prisma.experience.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExperienceCreateManyAndReturnArgs>(args?: SelectSubset<T, ExperienceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Experience.
     * @param {ExperienceDeleteArgs} args - Arguments to delete one Experience.
     * @example
     * // Delete one Experience
     * const Experience = await prisma.experience.delete({
     *   where: {
     *     // ... filter to delete one Experience
     *   }
     * })
     * 
     */
    delete<T extends ExperienceDeleteArgs>(args: SelectSubset<T, ExperienceDeleteArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Experience.
     * @param {ExperienceUpdateArgs} args - Arguments to update one Experience.
     * @example
     * // Update one Experience
     * const experience = await prisma.experience.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExperienceUpdateArgs>(args: SelectSubset<T, ExperienceUpdateArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Experiences.
     * @param {ExperienceDeleteManyArgs} args - Arguments to filter Experiences to delete.
     * @example
     * // Delete a few Experiences
     * const { count } = await prisma.experience.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExperienceDeleteManyArgs>(args?: SelectSubset<T, ExperienceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Experiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Experiences
     * const experience = await prisma.experience.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExperienceUpdateManyArgs>(args: SelectSubset<T, ExperienceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Experiences and returns the data updated in the database.
     * @param {ExperienceUpdateManyAndReturnArgs} args - Arguments to update many Experiences.
     * @example
     * // Update many Experiences
     * const experience = await prisma.experience.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Experiences and only return the `id`
     * const experienceWithIdOnly = await prisma.experience.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExperienceUpdateManyAndReturnArgs>(args: SelectSubset<T, ExperienceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Experience.
     * @param {ExperienceUpsertArgs} args - Arguments to update or create a Experience.
     * @example
     * // Update or create a Experience
     * const experience = await prisma.experience.upsert({
     *   create: {
     *     // ... data to create a Experience
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Experience we want to update
     *   }
     * })
     */
    upsert<T extends ExperienceUpsertArgs>(args: SelectSubset<T, ExperienceUpsertArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Experiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceCountArgs} args - Arguments to filter Experiences to count.
     * @example
     * // Count the number of Experiences
     * const count = await prisma.experience.count({
     *   where: {
     *     // ... the filter for the Experiences we want to count
     *   }
     * })
    **/
    count<T extends ExperienceCountArgs>(
      args?: Subset<T, ExperienceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExperienceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Experience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExperienceAggregateArgs>(args: Subset<T, ExperienceAggregateArgs>): Prisma.PrismaPromise<GetExperienceAggregateType<T>>

    /**
     * Group by Experience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExperienceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExperienceGroupByArgs['orderBy'] }
        : { orderBy?: ExperienceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExperienceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExperienceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Experience model
   */
  readonly fields: ExperienceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Experience.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExperienceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    psychologist<T extends PsychologistProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistProfileDefaultArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Experience model
   */
  interface ExperienceFieldRefs {
    readonly id: FieldRef<"Experience", 'String'>
    readonly psychologistId: FieldRef<"Experience", 'String'>
    readonly name: FieldRef<"Experience", 'String'>
    readonly createdAt: FieldRef<"Experience", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Experience findUnique
   */
  export type ExperienceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience findUniqueOrThrow
   */
  export type ExperienceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience findFirst
   */
  export type ExperienceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Experiences.
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Experiences.
     */
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Experience findFirstOrThrow
   */
  export type ExperienceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Experiences.
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Experiences.
     */
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Experience findMany
   */
  export type ExperienceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experiences to fetch.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Experiences.
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Experience create
   */
  export type ExperienceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * The data needed to create a Experience.
     */
    data: XOR<ExperienceCreateInput, ExperienceUncheckedCreateInput>
  }

  /**
   * Experience createMany
   */
  export type ExperienceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Experiences.
     */
    data: ExperienceCreateManyInput | ExperienceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Experience createManyAndReturn
   */
  export type ExperienceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * The data used to create many Experiences.
     */
    data: ExperienceCreateManyInput | ExperienceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Experience update
   */
  export type ExperienceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * The data needed to update a Experience.
     */
    data: XOR<ExperienceUpdateInput, ExperienceUncheckedUpdateInput>
    /**
     * Choose, which Experience to update.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience updateMany
   */
  export type ExperienceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Experiences.
     */
    data: XOR<ExperienceUpdateManyMutationInput, ExperienceUncheckedUpdateManyInput>
    /**
     * Filter which Experiences to update
     */
    where?: ExperienceWhereInput
    /**
     * Limit how many Experiences to update.
     */
    limit?: number
  }

  /**
   * Experience updateManyAndReturn
   */
  export type ExperienceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * The data used to update Experiences.
     */
    data: XOR<ExperienceUpdateManyMutationInput, ExperienceUncheckedUpdateManyInput>
    /**
     * Filter which Experiences to update
     */
    where?: ExperienceWhereInput
    /**
     * Limit how many Experiences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Experience upsert
   */
  export type ExperienceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * The filter to search for the Experience to update in case it exists.
     */
    where: ExperienceWhereUniqueInput
    /**
     * In case the Experience found by the `where` argument doesn't exist, create a new Experience with this data.
     */
    create: XOR<ExperienceCreateInput, ExperienceUncheckedCreateInput>
    /**
     * In case the Experience was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExperienceUpdateInput, ExperienceUncheckedUpdateInput>
  }

  /**
   * Experience delete
   */
  export type ExperienceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter which Experience to delete.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience deleteMany
   */
  export type ExperienceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Experiences to delete
     */
    where?: ExperienceWhereInput
    /**
     * Limit how many Experiences to delete.
     */
    limit?: number
  }

  /**
   * Experience without action
   */
  export type ExperienceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
  }


  /**
   * Model Specialization
   */

  export type AggregateSpecialization = {
    _count: SpecializationCountAggregateOutputType | null
    _min: SpecializationMinAggregateOutputType | null
    _max: SpecializationMaxAggregateOutputType | null
  }

  export type SpecializationMinAggregateOutputType = {
    id: string | null
    psychologistId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type SpecializationMaxAggregateOutputType = {
    id: string | null
    psychologistId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type SpecializationCountAggregateOutputType = {
    id: number
    psychologistId: number
    name: number
    createdAt: number
    _all: number
  }


  export type SpecializationMinAggregateInputType = {
    id?: true
    psychologistId?: true
    name?: true
    createdAt?: true
  }

  export type SpecializationMaxAggregateInputType = {
    id?: true
    psychologistId?: true
    name?: true
    createdAt?: true
  }

  export type SpecializationCountAggregateInputType = {
    id?: true
    psychologistId?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type SpecializationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Specialization to aggregate.
     */
    where?: SpecializationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specializations to fetch.
     */
    orderBy?: SpecializationOrderByWithRelationInput | SpecializationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpecializationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specializations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specializations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Specializations
    **/
    _count?: true | SpecializationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpecializationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpecializationMaxAggregateInputType
  }

  export type GetSpecializationAggregateType<T extends SpecializationAggregateArgs> = {
        [P in keyof T & keyof AggregateSpecialization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpecialization[P]>
      : GetScalarType<T[P], AggregateSpecialization[P]>
  }




  export type SpecializationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpecializationWhereInput
    orderBy?: SpecializationOrderByWithAggregationInput | SpecializationOrderByWithAggregationInput[]
    by: SpecializationScalarFieldEnum[] | SpecializationScalarFieldEnum
    having?: SpecializationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpecializationCountAggregateInputType | true
    _min?: SpecializationMinAggregateInputType
    _max?: SpecializationMaxAggregateInputType
  }

  export type SpecializationGroupByOutputType = {
    id: string
    psychologistId: string
    name: string
    createdAt: Date
    _count: SpecializationCountAggregateOutputType | null
    _min: SpecializationMinAggregateOutputType | null
    _max: SpecializationMaxAggregateOutputType | null
  }

  type GetSpecializationGroupByPayload<T extends SpecializationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpecializationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpecializationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpecializationGroupByOutputType[P]>
            : GetScalarType<T[P], SpecializationGroupByOutputType[P]>
        }
      >
    >


  export type SpecializationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    name?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["specialization"]>

  export type SpecializationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    name?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["specialization"]>

  export type SpecializationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    name?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["specialization"]>

  export type SpecializationSelectScalar = {
    id?: boolean
    psychologistId?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type SpecializationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "psychologistId" | "name" | "createdAt", ExtArgs["result"]["specialization"]>
  export type SpecializationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }
  export type SpecializationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }
  export type SpecializationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }

  export type $SpecializationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Specialization"
    objects: {
      psychologist: Prisma.$PsychologistProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      psychologistId: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["specialization"]>
    composites: {}
  }

  type SpecializationGetPayload<S extends boolean | null | undefined | SpecializationDefaultArgs> = $Result.GetResult<Prisma.$SpecializationPayload, S>

  type SpecializationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpecializationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpecializationCountAggregateInputType | true
    }

  export interface SpecializationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Specialization'], meta: { name: 'Specialization' } }
    /**
     * Find zero or one Specialization that matches the filter.
     * @param {SpecializationFindUniqueArgs} args - Arguments to find a Specialization
     * @example
     * // Get one Specialization
     * const specialization = await prisma.specialization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpecializationFindUniqueArgs>(args: SelectSubset<T, SpecializationFindUniqueArgs<ExtArgs>>): Prisma__SpecializationClient<$Result.GetResult<Prisma.$SpecializationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Specialization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpecializationFindUniqueOrThrowArgs} args - Arguments to find a Specialization
     * @example
     * // Get one Specialization
     * const specialization = await prisma.specialization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpecializationFindUniqueOrThrowArgs>(args: SelectSubset<T, SpecializationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpecializationClient<$Result.GetResult<Prisma.$SpecializationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Specialization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecializationFindFirstArgs} args - Arguments to find a Specialization
     * @example
     * // Get one Specialization
     * const specialization = await prisma.specialization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpecializationFindFirstArgs>(args?: SelectSubset<T, SpecializationFindFirstArgs<ExtArgs>>): Prisma__SpecializationClient<$Result.GetResult<Prisma.$SpecializationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Specialization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecializationFindFirstOrThrowArgs} args - Arguments to find a Specialization
     * @example
     * // Get one Specialization
     * const specialization = await prisma.specialization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpecializationFindFirstOrThrowArgs>(args?: SelectSubset<T, SpecializationFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpecializationClient<$Result.GetResult<Prisma.$SpecializationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Specializations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecializationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Specializations
     * const specializations = await prisma.specialization.findMany()
     * 
     * // Get first 10 Specializations
     * const specializations = await prisma.specialization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const specializationWithIdOnly = await prisma.specialization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpecializationFindManyArgs>(args?: SelectSubset<T, SpecializationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecializationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Specialization.
     * @param {SpecializationCreateArgs} args - Arguments to create a Specialization.
     * @example
     * // Create one Specialization
     * const Specialization = await prisma.specialization.create({
     *   data: {
     *     // ... data to create a Specialization
     *   }
     * })
     * 
     */
    create<T extends SpecializationCreateArgs>(args: SelectSubset<T, SpecializationCreateArgs<ExtArgs>>): Prisma__SpecializationClient<$Result.GetResult<Prisma.$SpecializationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Specializations.
     * @param {SpecializationCreateManyArgs} args - Arguments to create many Specializations.
     * @example
     * // Create many Specializations
     * const specialization = await prisma.specialization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpecializationCreateManyArgs>(args?: SelectSubset<T, SpecializationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Specializations and returns the data saved in the database.
     * @param {SpecializationCreateManyAndReturnArgs} args - Arguments to create many Specializations.
     * @example
     * // Create many Specializations
     * const specialization = await prisma.specialization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Specializations and only return the `id`
     * const specializationWithIdOnly = await prisma.specialization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpecializationCreateManyAndReturnArgs>(args?: SelectSubset<T, SpecializationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecializationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Specialization.
     * @param {SpecializationDeleteArgs} args - Arguments to delete one Specialization.
     * @example
     * // Delete one Specialization
     * const Specialization = await prisma.specialization.delete({
     *   where: {
     *     // ... filter to delete one Specialization
     *   }
     * })
     * 
     */
    delete<T extends SpecializationDeleteArgs>(args: SelectSubset<T, SpecializationDeleteArgs<ExtArgs>>): Prisma__SpecializationClient<$Result.GetResult<Prisma.$SpecializationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Specialization.
     * @param {SpecializationUpdateArgs} args - Arguments to update one Specialization.
     * @example
     * // Update one Specialization
     * const specialization = await prisma.specialization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpecializationUpdateArgs>(args: SelectSubset<T, SpecializationUpdateArgs<ExtArgs>>): Prisma__SpecializationClient<$Result.GetResult<Prisma.$SpecializationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Specializations.
     * @param {SpecializationDeleteManyArgs} args - Arguments to filter Specializations to delete.
     * @example
     * // Delete a few Specializations
     * const { count } = await prisma.specialization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpecializationDeleteManyArgs>(args?: SelectSubset<T, SpecializationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Specializations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecializationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Specializations
     * const specialization = await prisma.specialization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpecializationUpdateManyArgs>(args: SelectSubset<T, SpecializationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Specializations and returns the data updated in the database.
     * @param {SpecializationUpdateManyAndReturnArgs} args - Arguments to update many Specializations.
     * @example
     * // Update many Specializations
     * const specialization = await prisma.specialization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Specializations and only return the `id`
     * const specializationWithIdOnly = await prisma.specialization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SpecializationUpdateManyAndReturnArgs>(args: SelectSubset<T, SpecializationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecializationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Specialization.
     * @param {SpecializationUpsertArgs} args - Arguments to update or create a Specialization.
     * @example
     * // Update or create a Specialization
     * const specialization = await prisma.specialization.upsert({
     *   create: {
     *     // ... data to create a Specialization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Specialization we want to update
     *   }
     * })
     */
    upsert<T extends SpecializationUpsertArgs>(args: SelectSubset<T, SpecializationUpsertArgs<ExtArgs>>): Prisma__SpecializationClient<$Result.GetResult<Prisma.$SpecializationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Specializations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecializationCountArgs} args - Arguments to filter Specializations to count.
     * @example
     * // Count the number of Specializations
     * const count = await prisma.specialization.count({
     *   where: {
     *     // ... the filter for the Specializations we want to count
     *   }
     * })
    **/
    count<T extends SpecializationCountArgs>(
      args?: Subset<T, SpecializationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpecializationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Specialization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecializationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpecializationAggregateArgs>(args: Subset<T, SpecializationAggregateArgs>): Prisma.PrismaPromise<GetSpecializationAggregateType<T>>

    /**
     * Group by Specialization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecializationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpecializationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpecializationGroupByArgs['orderBy'] }
        : { orderBy?: SpecializationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpecializationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpecializationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Specialization model
   */
  readonly fields: SpecializationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Specialization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpecializationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    psychologist<T extends PsychologistProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistProfileDefaultArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Specialization model
   */
  interface SpecializationFieldRefs {
    readonly id: FieldRef<"Specialization", 'String'>
    readonly psychologistId: FieldRef<"Specialization", 'String'>
    readonly name: FieldRef<"Specialization", 'String'>
    readonly createdAt: FieldRef<"Specialization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Specialization findUnique
   */
  export type SpecializationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialization
     */
    select?: SpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialization
     */
    omit?: SpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecializationInclude<ExtArgs> | null
    /**
     * Filter, which Specialization to fetch.
     */
    where: SpecializationWhereUniqueInput
  }

  /**
   * Specialization findUniqueOrThrow
   */
  export type SpecializationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialization
     */
    select?: SpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialization
     */
    omit?: SpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecializationInclude<ExtArgs> | null
    /**
     * Filter, which Specialization to fetch.
     */
    where: SpecializationWhereUniqueInput
  }

  /**
   * Specialization findFirst
   */
  export type SpecializationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialization
     */
    select?: SpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialization
     */
    omit?: SpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecializationInclude<ExtArgs> | null
    /**
     * Filter, which Specialization to fetch.
     */
    where?: SpecializationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specializations to fetch.
     */
    orderBy?: SpecializationOrderByWithRelationInput | SpecializationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Specializations.
     */
    cursor?: SpecializationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specializations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specializations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Specializations.
     */
    distinct?: SpecializationScalarFieldEnum | SpecializationScalarFieldEnum[]
  }

  /**
   * Specialization findFirstOrThrow
   */
  export type SpecializationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialization
     */
    select?: SpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialization
     */
    omit?: SpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecializationInclude<ExtArgs> | null
    /**
     * Filter, which Specialization to fetch.
     */
    where?: SpecializationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specializations to fetch.
     */
    orderBy?: SpecializationOrderByWithRelationInput | SpecializationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Specializations.
     */
    cursor?: SpecializationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specializations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specializations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Specializations.
     */
    distinct?: SpecializationScalarFieldEnum | SpecializationScalarFieldEnum[]
  }

  /**
   * Specialization findMany
   */
  export type SpecializationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialization
     */
    select?: SpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialization
     */
    omit?: SpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecializationInclude<ExtArgs> | null
    /**
     * Filter, which Specializations to fetch.
     */
    where?: SpecializationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specializations to fetch.
     */
    orderBy?: SpecializationOrderByWithRelationInput | SpecializationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Specializations.
     */
    cursor?: SpecializationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specializations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specializations.
     */
    skip?: number
    distinct?: SpecializationScalarFieldEnum | SpecializationScalarFieldEnum[]
  }

  /**
   * Specialization create
   */
  export type SpecializationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialization
     */
    select?: SpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialization
     */
    omit?: SpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecializationInclude<ExtArgs> | null
    /**
     * The data needed to create a Specialization.
     */
    data: XOR<SpecializationCreateInput, SpecializationUncheckedCreateInput>
  }

  /**
   * Specialization createMany
   */
  export type SpecializationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Specializations.
     */
    data: SpecializationCreateManyInput | SpecializationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Specialization createManyAndReturn
   */
  export type SpecializationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialization
     */
    select?: SpecializationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Specialization
     */
    omit?: SpecializationOmit<ExtArgs> | null
    /**
     * The data used to create many Specializations.
     */
    data: SpecializationCreateManyInput | SpecializationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecializationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Specialization update
   */
  export type SpecializationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialization
     */
    select?: SpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialization
     */
    omit?: SpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecializationInclude<ExtArgs> | null
    /**
     * The data needed to update a Specialization.
     */
    data: XOR<SpecializationUpdateInput, SpecializationUncheckedUpdateInput>
    /**
     * Choose, which Specialization to update.
     */
    where: SpecializationWhereUniqueInput
  }

  /**
   * Specialization updateMany
   */
  export type SpecializationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Specializations.
     */
    data: XOR<SpecializationUpdateManyMutationInput, SpecializationUncheckedUpdateManyInput>
    /**
     * Filter which Specializations to update
     */
    where?: SpecializationWhereInput
    /**
     * Limit how many Specializations to update.
     */
    limit?: number
  }

  /**
   * Specialization updateManyAndReturn
   */
  export type SpecializationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialization
     */
    select?: SpecializationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Specialization
     */
    omit?: SpecializationOmit<ExtArgs> | null
    /**
     * The data used to update Specializations.
     */
    data: XOR<SpecializationUpdateManyMutationInput, SpecializationUncheckedUpdateManyInput>
    /**
     * Filter which Specializations to update
     */
    where?: SpecializationWhereInput
    /**
     * Limit how many Specializations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecializationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Specialization upsert
   */
  export type SpecializationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialization
     */
    select?: SpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialization
     */
    omit?: SpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecializationInclude<ExtArgs> | null
    /**
     * The filter to search for the Specialization to update in case it exists.
     */
    where: SpecializationWhereUniqueInput
    /**
     * In case the Specialization found by the `where` argument doesn't exist, create a new Specialization with this data.
     */
    create: XOR<SpecializationCreateInput, SpecializationUncheckedCreateInput>
    /**
     * In case the Specialization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpecializationUpdateInput, SpecializationUncheckedUpdateInput>
  }

  /**
   * Specialization delete
   */
  export type SpecializationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialization
     */
    select?: SpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialization
     */
    omit?: SpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecializationInclude<ExtArgs> | null
    /**
     * Filter which Specialization to delete.
     */
    where: SpecializationWhereUniqueInput
  }

  /**
   * Specialization deleteMany
   */
  export type SpecializationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Specializations to delete
     */
    where?: SpecializationWhereInput
    /**
     * Limit how many Specializations to delete.
     */
    limit?: number
  }

  /**
   * Specialization without action
   */
  export type SpecializationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialization
     */
    select?: SpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialization
     */
    omit?: SpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecializationInclude<ExtArgs> | null
  }


  /**
   * Model Expertise
   */

  export type AggregateExpertise = {
    _count: ExpertiseCountAggregateOutputType | null
    _min: ExpertiseMinAggregateOutputType | null
    _max: ExpertiseMaxAggregateOutputType | null
  }

  export type ExpertiseMinAggregateOutputType = {
    id: string | null
    psychologistId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type ExpertiseMaxAggregateOutputType = {
    id: string | null
    psychologistId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type ExpertiseCountAggregateOutputType = {
    id: number
    psychologistId: number
    name: number
    createdAt: number
    _all: number
  }


  export type ExpertiseMinAggregateInputType = {
    id?: true
    psychologistId?: true
    name?: true
    createdAt?: true
  }

  export type ExpertiseMaxAggregateInputType = {
    id?: true
    psychologistId?: true
    name?: true
    createdAt?: true
  }

  export type ExpertiseCountAggregateInputType = {
    id?: true
    psychologistId?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type ExpertiseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expertise to aggregate.
     */
    where?: ExpertiseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expertise to fetch.
     */
    orderBy?: ExpertiseOrderByWithRelationInput | ExpertiseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpertiseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expertise from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expertise.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Expertise
    **/
    _count?: true | ExpertiseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpertiseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpertiseMaxAggregateInputType
  }

  export type GetExpertiseAggregateType<T extends ExpertiseAggregateArgs> = {
        [P in keyof T & keyof AggregateExpertise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpertise[P]>
      : GetScalarType<T[P], AggregateExpertise[P]>
  }




  export type ExpertiseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpertiseWhereInput
    orderBy?: ExpertiseOrderByWithAggregationInput | ExpertiseOrderByWithAggregationInput[]
    by: ExpertiseScalarFieldEnum[] | ExpertiseScalarFieldEnum
    having?: ExpertiseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpertiseCountAggregateInputType | true
    _min?: ExpertiseMinAggregateInputType
    _max?: ExpertiseMaxAggregateInputType
  }

  export type ExpertiseGroupByOutputType = {
    id: string
    psychologistId: string
    name: string
    createdAt: Date
    _count: ExpertiseCountAggregateOutputType | null
    _min: ExpertiseMinAggregateOutputType | null
    _max: ExpertiseMaxAggregateOutputType | null
  }

  type GetExpertiseGroupByPayload<T extends ExpertiseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpertiseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpertiseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpertiseGroupByOutputType[P]>
            : GetScalarType<T[P], ExpertiseGroupByOutputType[P]>
        }
      >
    >


  export type ExpertiseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    name?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expertise"]>

  export type ExpertiseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    name?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expertise"]>

  export type ExpertiseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    name?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expertise"]>

  export type ExpertiseSelectScalar = {
    id?: boolean
    psychologistId?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type ExpertiseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "psychologistId" | "name" | "createdAt", ExtArgs["result"]["expertise"]>
  export type ExpertiseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }
  export type ExpertiseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }
  export type ExpertiseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }

  export type $ExpertisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Expertise"
    objects: {
      psychologist: Prisma.$PsychologistProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      psychologistId: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["expertise"]>
    composites: {}
  }

  type ExpertiseGetPayload<S extends boolean | null | undefined | ExpertiseDefaultArgs> = $Result.GetResult<Prisma.$ExpertisePayload, S>

  type ExpertiseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExpertiseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpertiseCountAggregateInputType | true
    }

  export interface ExpertiseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Expertise'], meta: { name: 'Expertise' } }
    /**
     * Find zero or one Expertise that matches the filter.
     * @param {ExpertiseFindUniqueArgs} args - Arguments to find a Expertise
     * @example
     * // Get one Expertise
     * const expertise = await prisma.expertise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpertiseFindUniqueArgs>(args: SelectSubset<T, ExpertiseFindUniqueArgs<ExtArgs>>): Prisma__ExpertiseClient<$Result.GetResult<Prisma.$ExpertisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Expertise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExpertiseFindUniqueOrThrowArgs} args - Arguments to find a Expertise
     * @example
     * // Get one Expertise
     * const expertise = await prisma.expertise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpertiseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpertiseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpertiseClient<$Result.GetResult<Prisma.$ExpertisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expertise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpertiseFindFirstArgs} args - Arguments to find a Expertise
     * @example
     * // Get one Expertise
     * const expertise = await prisma.expertise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpertiseFindFirstArgs>(args?: SelectSubset<T, ExpertiseFindFirstArgs<ExtArgs>>): Prisma__ExpertiseClient<$Result.GetResult<Prisma.$ExpertisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expertise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpertiseFindFirstOrThrowArgs} args - Arguments to find a Expertise
     * @example
     * // Get one Expertise
     * const expertise = await prisma.expertise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpertiseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpertiseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpertiseClient<$Result.GetResult<Prisma.$ExpertisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Expertise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpertiseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expertise
     * const expertise = await prisma.expertise.findMany()
     * 
     * // Get first 10 Expertise
     * const expertise = await prisma.expertise.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expertiseWithIdOnly = await prisma.expertise.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpertiseFindManyArgs>(args?: SelectSubset<T, ExpertiseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpertisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Expertise.
     * @param {ExpertiseCreateArgs} args - Arguments to create a Expertise.
     * @example
     * // Create one Expertise
     * const Expertise = await prisma.expertise.create({
     *   data: {
     *     // ... data to create a Expertise
     *   }
     * })
     * 
     */
    create<T extends ExpertiseCreateArgs>(args: SelectSubset<T, ExpertiseCreateArgs<ExtArgs>>): Prisma__ExpertiseClient<$Result.GetResult<Prisma.$ExpertisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Expertise.
     * @param {ExpertiseCreateManyArgs} args - Arguments to create many Expertise.
     * @example
     * // Create many Expertise
     * const expertise = await prisma.expertise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpertiseCreateManyArgs>(args?: SelectSubset<T, ExpertiseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expertise and returns the data saved in the database.
     * @param {ExpertiseCreateManyAndReturnArgs} args - Arguments to create many Expertise.
     * @example
     * // Create many Expertise
     * const expertise = await prisma.expertise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expertise and only return the `id`
     * const expertiseWithIdOnly = await prisma.expertise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpertiseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpertiseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpertisePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Expertise.
     * @param {ExpertiseDeleteArgs} args - Arguments to delete one Expertise.
     * @example
     * // Delete one Expertise
     * const Expertise = await prisma.expertise.delete({
     *   where: {
     *     // ... filter to delete one Expertise
     *   }
     * })
     * 
     */
    delete<T extends ExpertiseDeleteArgs>(args: SelectSubset<T, ExpertiseDeleteArgs<ExtArgs>>): Prisma__ExpertiseClient<$Result.GetResult<Prisma.$ExpertisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Expertise.
     * @param {ExpertiseUpdateArgs} args - Arguments to update one Expertise.
     * @example
     * // Update one Expertise
     * const expertise = await prisma.expertise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpertiseUpdateArgs>(args: SelectSubset<T, ExpertiseUpdateArgs<ExtArgs>>): Prisma__ExpertiseClient<$Result.GetResult<Prisma.$ExpertisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Expertise.
     * @param {ExpertiseDeleteManyArgs} args - Arguments to filter Expertise to delete.
     * @example
     * // Delete a few Expertise
     * const { count } = await prisma.expertise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpertiseDeleteManyArgs>(args?: SelectSubset<T, ExpertiseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expertise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpertiseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expertise
     * const expertise = await prisma.expertise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpertiseUpdateManyArgs>(args: SelectSubset<T, ExpertiseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expertise and returns the data updated in the database.
     * @param {ExpertiseUpdateManyAndReturnArgs} args - Arguments to update many Expertise.
     * @example
     * // Update many Expertise
     * const expertise = await prisma.expertise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Expertise and only return the `id`
     * const expertiseWithIdOnly = await prisma.expertise.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExpertiseUpdateManyAndReturnArgs>(args: SelectSubset<T, ExpertiseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpertisePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Expertise.
     * @param {ExpertiseUpsertArgs} args - Arguments to update or create a Expertise.
     * @example
     * // Update or create a Expertise
     * const expertise = await prisma.expertise.upsert({
     *   create: {
     *     // ... data to create a Expertise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expertise we want to update
     *   }
     * })
     */
    upsert<T extends ExpertiseUpsertArgs>(args: SelectSubset<T, ExpertiseUpsertArgs<ExtArgs>>): Prisma__ExpertiseClient<$Result.GetResult<Prisma.$ExpertisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Expertise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpertiseCountArgs} args - Arguments to filter Expertise to count.
     * @example
     * // Count the number of Expertise
     * const count = await prisma.expertise.count({
     *   where: {
     *     // ... the filter for the Expertise we want to count
     *   }
     * })
    **/
    count<T extends ExpertiseCountArgs>(
      args?: Subset<T, ExpertiseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpertiseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expertise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpertiseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpertiseAggregateArgs>(args: Subset<T, ExpertiseAggregateArgs>): Prisma.PrismaPromise<GetExpertiseAggregateType<T>>

    /**
     * Group by Expertise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpertiseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpertiseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpertiseGroupByArgs['orderBy'] }
        : { orderBy?: ExpertiseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpertiseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpertiseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Expertise model
   */
  readonly fields: ExpertiseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Expertise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpertiseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    psychologist<T extends PsychologistProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistProfileDefaultArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Expertise model
   */
  interface ExpertiseFieldRefs {
    readonly id: FieldRef<"Expertise", 'String'>
    readonly psychologistId: FieldRef<"Expertise", 'String'>
    readonly name: FieldRef<"Expertise", 'String'>
    readonly createdAt: FieldRef<"Expertise", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Expertise findUnique
   */
  export type ExpertiseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expertise
     */
    select?: ExpertiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expertise
     */
    omit?: ExpertiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpertiseInclude<ExtArgs> | null
    /**
     * Filter, which Expertise to fetch.
     */
    where: ExpertiseWhereUniqueInput
  }

  /**
   * Expertise findUniqueOrThrow
   */
  export type ExpertiseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expertise
     */
    select?: ExpertiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expertise
     */
    omit?: ExpertiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpertiseInclude<ExtArgs> | null
    /**
     * Filter, which Expertise to fetch.
     */
    where: ExpertiseWhereUniqueInput
  }

  /**
   * Expertise findFirst
   */
  export type ExpertiseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expertise
     */
    select?: ExpertiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expertise
     */
    omit?: ExpertiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpertiseInclude<ExtArgs> | null
    /**
     * Filter, which Expertise to fetch.
     */
    where?: ExpertiseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expertise to fetch.
     */
    orderBy?: ExpertiseOrderByWithRelationInput | ExpertiseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expertise.
     */
    cursor?: ExpertiseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expertise from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expertise.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expertise.
     */
    distinct?: ExpertiseScalarFieldEnum | ExpertiseScalarFieldEnum[]
  }

  /**
   * Expertise findFirstOrThrow
   */
  export type ExpertiseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expertise
     */
    select?: ExpertiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expertise
     */
    omit?: ExpertiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpertiseInclude<ExtArgs> | null
    /**
     * Filter, which Expertise to fetch.
     */
    where?: ExpertiseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expertise to fetch.
     */
    orderBy?: ExpertiseOrderByWithRelationInput | ExpertiseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expertise.
     */
    cursor?: ExpertiseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expertise from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expertise.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expertise.
     */
    distinct?: ExpertiseScalarFieldEnum | ExpertiseScalarFieldEnum[]
  }

  /**
   * Expertise findMany
   */
  export type ExpertiseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expertise
     */
    select?: ExpertiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expertise
     */
    omit?: ExpertiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpertiseInclude<ExtArgs> | null
    /**
     * Filter, which Expertise to fetch.
     */
    where?: ExpertiseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expertise to fetch.
     */
    orderBy?: ExpertiseOrderByWithRelationInput | ExpertiseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Expertise.
     */
    cursor?: ExpertiseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expertise from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expertise.
     */
    skip?: number
    distinct?: ExpertiseScalarFieldEnum | ExpertiseScalarFieldEnum[]
  }

  /**
   * Expertise create
   */
  export type ExpertiseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expertise
     */
    select?: ExpertiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expertise
     */
    omit?: ExpertiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpertiseInclude<ExtArgs> | null
    /**
     * The data needed to create a Expertise.
     */
    data: XOR<ExpertiseCreateInput, ExpertiseUncheckedCreateInput>
  }

  /**
   * Expertise createMany
   */
  export type ExpertiseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Expertise.
     */
    data: ExpertiseCreateManyInput | ExpertiseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Expertise createManyAndReturn
   */
  export type ExpertiseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expertise
     */
    select?: ExpertiseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expertise
     */
    omit?: ExpertiseOmit<ExtArgs> | null
    /**
     * The data used to create many Expertise.
     */
    data: ExpertiseCreateManyInput | ExpertiseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpertiseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expertise update
   */
  export type ExpertiseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expertise
     */
    select?: ExpertiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expertise
     */
    omit?: ExpertiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpertiseInclude<ExtArgs> | null
    /**
     * The data needed to update a Expertise.
     */
    data: XOR<ExpertiseUpdateInput, ExpertiseUncheckedUpdateInput>
    /**
     * Choose, which Expertise to update.
     */
    where: ExpertiseWhereUniqueInput
  }

  /**
   * Expertise updateMany
   */
  export type ExpertiseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Expertise.
     */
    data: XOR<ExpertiseUpdateManyMutationInput, ExpertiseUncheckedUpdateManyInput>
    /**
     * Filter which Expertise to update
     */
    where?: ExpertiseWhereInput
    /**
     * Limit how many Expertise to update.
     */
    limit?: number
  }

  /**
   * Expertise updateManyAndReturn
   */
  export type ExpertiseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expertise
     */
    select?: ExpertiseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expertise
     */
    omit?: ExpertiseOmit<ExtArgs> | null
    /**
     * The data used to update Expertise.
     */
    data: XOR<ExpertiseUpdateManyMutationInput, ExpertiseUncheckedUpdateManyInput>
    /**
     * Filter which Expertise to update
     */
    where?: ExpertiseWhereInput
    /**
     * Limit how many Expertise to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpertiseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expertise upsert
   */
  export type ExpertiseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expertise
     */
    select?: ExpertiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expertise
     */
    omit?: ExpertiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpertiseInclude<ExtArgs> | null
    /**
     * The filter to search for the Expertise to update in case it exists.
     */
    where: ExpertiseWhereUniqueInput
    /**
     * In case the Expertise found by the `where` argument doesn't exist, create a new Expertise with this data.
     */
    create: XOR<ExpertiseCreateInput, ExpertiseUncheckedCreateInput>
    /**
     * In case the Expertise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpertiseUpdateInput, ExpertiseUncheckedUpdateInput>
  }

  /**
   * Expertise delete
   */
  export type ExpertiseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expertise
     */
    select?: ExpertiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expertise
     */
    omit?: ExpertiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpertiseInclude<ExtArgs> | null
    /**
     * Filter which Expertise to delete.
     */
    where: ExpertiseWhereUniqueInput
  }

  /**
   * Expertise deleteMany
   */
  export type ExpertiseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expertise to delete
     */
    where?: ExpertiseWhereInput
    /**
     * Limit how many Expertise to delete.
     */
    limit?: number
  }

  /**
   * Expertise without action
   */
  export type ExpertiseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expertise
     */
    select?: ExpertiseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expertise
     */
    omit?: ExpertiseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpertiseInclude<ExtArgs> | null
  }


  /**
   * Model Schedule
   */

  export type AggregateSchedule = {
    _count: ScheduleCountAggregateOutputType | null
    _avg: ScheduleAvgAggregateOutputType | null
    _sum: ScheduleSumAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  export type ScheduleAvgAggregateOutputType = {
    duration: number | null
  }

  export type ScheduleSumAggregateOutputType = {
    duration: number | null
  }

  export type ScheduleMinAggregateOutputType = {
    id: string | null
    psychologistId: string | null
    date: Date | null
    startTime: string | null
    duration: number | null
    isAvailable: boolean | null
    createdAt: Date | null
  }

  export type ScheduleMaxAggregateOutputType = {
    id: string | null
    psychologistId: string | null
    date: Date | null
    startTime: string | null
    duration: number | null
    isAvailable: boolean | null
    createdAt: Date | null
  }

  export type ScheduleCountAggregateOutputType = {
    id: number
    psychologistId: number
    date: number
    startTime: number
    duration: number
    isAvailable: number
    createdAt: number
    _all: number
  }


  export type ScheduleAvgAggregateInputType = {
    duration?: true
  }

  export type ScheduleSumAggregateInputType = {
    duration?: true
  }

  export type ScheduleMinAggregateInputType = {
    id?: true
    psychologistId?: true
    date?: true
    startTime?: true
    duration?: true
    isAvailable?: true
    createdAt?: true
  }

  export type ScheduleMaxAggregateInputType = {
    id?: true
    psychologistId?: true
    date?: true
    startTime?: true
    duration?: true
    isAvailable?: true
    createdAt?: true
  }

  export type ScheduleCountAggregateInputType = {
    id?: true
    psychologistId?: true
    date?: true
    startTime?: true
    duration?: true
    isAvailable?: true
    createdAt?: true
    _all?: true
  }

  export type ScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedule to aggregate.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schedules
    **/
    _count?: true | ScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScheduleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScheduleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduleMaxAggregateInputType
  }

  export type GetScheduleAggregateType<T extends ScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchedule[P]>
      : GetScalarType<T[P], AggregateSchedule[P]>
  }




  export type ScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithAggregationInput | ScheduleOrderByWithAggregationInput[]
    by: ScheduleScalarFieldEnum[] | ScheduleScalarFieldEnum
    having?: ScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduleCountAggregateInputType | true
    _avg?: ScheduleAvgAggregateInputType
    _sum?: ScheduleSumAggregateInputType
    _min?: ScheduleMinAggregateInputType
    _max?: ScheduleMaxAggregateInputType
  }

  export type ScheduleGroupByOutputType = {
    id: string
    psychologistId: string
    date: Date
    startTime: string
    duration: number
    isAvailable: boolean
    createdAt: Date
    _count: ScheduleCountAggregateOutputType | null
    _avg: ScheduleAvgAggregateOutputType | null
    _sum: ScheduleSumAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  type GetScheduleGroupByPayload<T extends ScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
        }
      >
    >


  export type ScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    date?: boolean
    startTime?: boolean
    duration?: boolean
    isAvailable?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
    sessionNote?: boolean | Schedule$sessionNoteArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    date?: boolean
    startTime?: boolean
    duration?: boolean
    isAvailable?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    date?: boolean
    startTime?: boolean
    duration?: boolean
    isAvailable?: boolean
    createdAt?: boolean
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectScalar = {
    id?: boolean
    psychologistId?: boolean
    date?: boolean
    startTime?: boolean
    duration?: boolean
    isAvailable?: boolean
    createdAt?: boolean
  }

  export type ScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "psychologistId" | "date" | "startTime" | "duration" | "isAvailable" | "createdAt", ExtArgs["result"]["schedule"]>
  export type ScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
    sessionNote?: boolean | Schedule$sessionNoteArgs<ExtArgs>
  }
  export type ScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }
  export type ScheduleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
  }

  export type $SchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Schedule"
    objects: {
      psychologist: Prisma.$PsychologistProfilePayload<ExtArgs>
      sessionNote: Prisma.$SessionNotePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      psychologistId: string
      date: Date
      startTime: string
      duration: number
      isAvailable: boolean
      createdAt: Date
    }, ExtArgs["result"]["schedule"]>
    composites: {}
  }

  type ScheduleGetPayload<S extends boolean | null | undefined | ScheduleDefaultArgs> = $Result.GetResult<Prisma.$SchedulePayload, S>

  type ScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScheduleCountAggregateInputType | true
    }

  export interface ScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Schedule'], meta: { name: 'Schedule' } }
    /**
     * Find zero or one Schedule that matches the filter.
     * @param {ScheduleFindUniqueArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduleFindUniqueArgs>(args: SelectSubset<T, ScheduleFindUniqueArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Schedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduleFindUniqueOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduleFindFirstArgs>(args?: SelectSubset<T, ScheduleFindFirstArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Schedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schedules
     * const schedules = await prisma.schedule.findMany()
     * 
     * // Get first 10 Schedules
     * const schedules = await prisma.schedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduleWithIdOnly = await prisma.schedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduleFindManyArgs>(args?: SelectSubset<T, ScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Schedule.
     * @param {ScheduleCreateArgs} args - Arguments to create a Schedule.
     * @example
     * // Create one Schedule
     * const Schedule = await prisma.schedule.create({
     *   data: {
     *     // ... data to create a Schedule
     *   }
     * })
     * 
     */
    create<T extends ScheduleCreateArgs>(args: SelectSubset<T, ScheduleCreateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Schedules.
     * @param {ScheduleCreateManyArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduleCreateManyArgs>(args?: SelectSubset<T, ScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schedules and returns the data saved in the database.
     * @param {ScheduleCreateManyAndReturnArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schedules and only return the `id`
     * const scheduleWithIdOnly = await prisma.schedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, ScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Schedule.
     * @param {ScheduleDeleteArgs} args - Arguments to delete one Schedule.
     * @example
     * // Delete one Schedule
     * const Schedule = await prisma.schedule.delete({
     *   where: {
     *     // ... filter to delete one Schedule
     *   }
     * })
     * 
     */
    delete<T extends ScheduleDeleteArgs>(args: SelectSubset<T, ScheduleDeleteArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Schedule.
     * @param {ScheduleUpdateArgs} args - Arguments to update one Schedule.
     * @example
     * // Update one Schedule
     * const schedule = await prisma.schedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduleUpdateArgs>(args: SelectSubset<T, ScheduleUpdateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Schedules.
     * @param {ScheduleDeleteManyArgs} args - Arguments to filter Schedules to delete.
     * @example
     * // Delete a few Schedules
     * const { count } = await prisma.schedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduleDeleteManyArgs>(args?: SelectSubset<T, ScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduleUpdateManyArgs>(args: SelectSubset<T, ScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules and returns the data updated in the database.
     * @param {ScheduleUpdateManyAndReturnArgs} args - Arguments to update many Schedules.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Schedules and only return the `id`
     * const scheduleWithIdOnly = await prisma.schedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, ScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Schedule.
     * @param {ScheduleUpsertArgs} args - Arguments to update or create a Schedule.
     * @example
     * // Update or create a Schedule
     * const schedule = await prisma.schedule.upsert({
     *   create: {
     *     // ... data to create a Schedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Schedule we want to update
     *   }
     * })
     */
    upsert<T extends ScheduleUpsertArgs>(args: SelectSubset<T, ScheduleUpsertArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleCountArgs} args - Arguments to filter Schedules to count.
     * @example
     * // Count the number of Schedules
     * const count = await prisma.schedule.count({
     *   where: {
     *     // ... the filter for the Schedules we want to count
     *   }
     * })
    **/
    count<T extends ScheduleCountArgs>(
      args?: Subset<T, ScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScheduleAggregateArgs>(args: Subset<T, ScheduleAggregateArgs>): Prisma.PrismaPromise<GetScheduleAggregateType<T>>

    /**
     * Group by Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduleGroupByArgs['orderBy'] }
        : { orderBy?: ScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Schedule model
   */
  readonly fields: ScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Schedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    psychologist<T extends PsychologistProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistProfileDefaultArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sessionNote<T extends Schedule$sessionNoteArgs<ExtArgs> = {}>(args?: Subset<T, Schedule$sessionNoteArgs<ExtArgs>>): Prisma__SessionNoteClient<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Schedule model
   */
  interface ScheduleFieldRefs {
    readonly id: FieldRef<"Schedule", 'String'>
    readonly psychologistId: FieldRef<"Schedule", 'String'>
    readonly date: FieldRef<"Schedule", 'DateTime'>
    readonly startTime: FieldRef<"Schedule", 'String'>
    readonly duration: FieldRef<"Schedule", 'Int'>
    readonly isAvailable: FieldRef<"Schedule", 'Boolean'>
    readonly createdAt: FieldRef<"Schedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Schedule findUnique
   */
  export type ScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findUniqueOrThrow
   */
  export type ScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findFirst
   */
  export type ScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findFirstOrThrow
   */
  export type ScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findMany
   */
  export type ScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedules to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule create
   */
  export type ScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a Schedule.
     */
    data: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
  }

  /**
   * Schedule createMany
   */
  export type ScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Schedule createManyAndReturn
   */
  export type ScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Schedule update
   */
  export type ScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a Schedule.
     */
    data: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
    /**
     * Choose, which Schedule to update.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule updateMany
   */
  export type ScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
  }

  /**
   * Schedule updateManyAndReturn
   */
  export type ScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Schedule upsert
   */
  export type ScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the Schedule to update in case it exists.
     */
    where: ScheduleWhereUniqueInput
    /**
     * In case the Schedule found by the `where` argument doesn't exist, create a new Schedule with this data.
     */
    create: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
    /**
     * In case the Schedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
  }

  /**
   * Schedule delete
   */
  export type ScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter which Schedule to delete.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule deleteMany
   */
  export type ScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedules to delete
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to delete.
     */
    limit?: number
  }

  /**
   * Schedule.sessionNote
   */
  export type Schedule$sessionNoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteInclude<ExtArgs> | null
    where?: SessionNoteWhereInput
  }

  /**
   * Schedule without action
   */
  export type ScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
  }


  /**
   * Model EmailVerification
   */

  export type AggregateEmailVerification = {
    _count: EmailVerificationCountAggregateOutputType | null
    _min: EmailVerificationMinAggregateOutputType | null
    _max: EmailVerificationMaxAggregateOutputType | null
  }

  export type EmailVerificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type EmailVerificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type EmailVerificationCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    expiresAt: number
    usedAt: number
    createdAt: number
    _all: number
  }


  export type EmailVerificationMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type EmailVerificationMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type EmailVerificationCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
    _all?: true
  }

  export type EmailVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailVerification to aggregate.
     */
    where?: EmailVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerifications to fetch.
     */
    orderBy?: EmailVerificationOrderByWithRelationInput | EmailVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailVerifications
    **/
    _count?: true | EmailVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailVerificationMaxAggregateInputType
  }

  export type GetEmailVerificationAggregateType<T extends EmailVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailVerification[P]>
      : GetScalarType<T[P], AggregateEmailVerification[P]>
  }




  export type EmailVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailVerificationWhereInput
    orderBy?: EmailVerificationOrderByWithAggregationInput | EmailVerificationOrderByWithAggregationInput[]
    by: EmailVerificationScalarFieldEnum[] | EmailVerificationScalarFieldEnum
    having?: EmailVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailVerificationCountAggregateInputType | true
    _min?: EmailVerificationMinAggregateInputType
    _max?: EmailVerificationMaxAggregateInputType
  }

  export type EmailVerificationGroupByOutputType = {
    id: string
    userId: string
    token: string
    expiresAt: Date
    usedAt: Date | null
    createdAt: Date
    _count: EmailVerificationCountAggregateOutputType | null
    _min: EmailVerificationMinAggregateOutputType | null
    _max: EmailVerificationMaxAggregateOutputType | null
  }

  type GetEmailVerificationGroupByPayload<T extends EmailVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], EmailVerificationGroupByOutputType[P]>
        }
      >
    >


  export type EmailVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailVerification"]>

  export type EmailVerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailVerification"]>

  export type EmailVerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailVerification"]>

  export type EmailVerificationSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
  }

  export type EmailVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "expiresAt" | "usedAt" | "createdAt", ExtArgs["result"]["emailVerification"]>
  export type EmailVerificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailVerificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailVerificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EmailVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailVerification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      expiresAt: Date
      usedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["emailVerification"]>
    composites: {}
  }

  type EmailVerificationGetPayload<S extends boolean | null | undefined | EmailVerificationDefaultArgs> = $Result.GetResult<Prisma.$EmailVerificationPayload, S>

  type EmailVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailVerificationCountAggregateInputType | true
    }

  export interface EmailVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailVerification'], meta: { name: 'EmailVerification' } }
    /**
     * Find zero or one EmailVerification that matches the filter.
     * @param {EmailVerificationFindUniqueArgs} args - Arguments to find a EmailVerification
     * @example
     * // Get one EmailVerification
     * const emailVerification = await prisma.emailVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailVerificationFindUniqueArgs>(args: SelectSubset<T, EmailVerificationFindUniqueArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailVerificationFindUniqueOrThrowArgs} args - Arguments to find a EmailVerification
     * @example
     * // Get one EmailVerification
     * const emailVerification = await prisma.emailVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationFindFirstArgs} args - Arguments to find a EmailVerification
     * @example
     * // Get one EmailVerification
     * const emailVerification = await prisma.emailVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailVerificationFindFirstArgs>(args?: SelectSubset<T, EmailVerificationFindFirstArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationFindFirstOrThrowArgs} args - Arguments to find a EmailVerification
     * @example
     * // Get one EmailVerification
     * const emailVerification = await prisma.emailVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailVerifications
     * const emailVerifications = await prisma.emailVerification.findMany()
     * 
     * // Get first 10 EmailVerifications
     * const emailVerifications = await prisma.emailVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailVerificationWithIdOnly = await prisma.emailVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailVerificationFindManyArgs>(args?: SelectSubset<T, EmailVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailVerification.
     * @param {EmailVerificationCreateArgs} args - Arguments to create a EmailVerification.
     * @example
     * // Create one EmailVerification
     * const EmailVerification = await prisma.emailVerification.create({
     *   data: {
     *     // ... data to create a EmailVerification
     *   }
     * })
     * 
     */
    create<T extends EmailVerificationCreateArgs>(args: SelectSubset<T, EmailVerificationCreateArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailVerifications.
     * @param {EmailVerificationCreateManyArgs} args - Arguments to create many EmailVerifications.
     * @example
     * // Create many EmailVerifications
     * const emailVerification = await prisma.emailVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailVerificationCreateManyArgs>(args?: SelectSubset<T, EmailVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailVerifications and returns the data saved in the database.
     * @param {EmailVerificationCreateManyAndReturnArgs} args - Arguments to create many EmailVerifications.
     * @example
     * // Create many EmailVerifications
     * const emailVerification = await prisma.emailVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailVerifications and only return the `id`
     * const emailVerificationWithIdOnly = await prisma.emailVerification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailVerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailVerification.
     * @param {EmailVerificationDeleteArgs} args - Arguments to delete one EmailVerification.
     * @example
     * // Delete one EmailVerification
     * const EmailVerification = await prisma.emailVerification.delete({
     *   where: {
     *     // ... filter to delete one EmailVerification
     *   }
     * })
     * 
     */
    delete<T extends EmailVerificationDeleteArgs>(args: SelectSubset<T, EmailVerificationDeleteArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailVerification.
     * @param {EmailVerificationUpdateArgs} args - Arguments to update one EmailVerification.
     * @example
     * // Update one EmailVerification
     * const emailVerification = await prisma.emailVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailVerificationUpdateArgs>(args: SelectSubset<T, EmailVerificationUpdateArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailVerifications.
     * @param {EmailVerificationDeleteManyArgs} args - Arguments to filter EmailVerifications to delete.
     * @example
     * // Delete a few EmailVerifications
     * const { count } = await prisma.emailVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailVerificationDeleteManyArgs>(args?: SelectSubset<T, EmailVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailVerifications
     * const emailVerification = await prisma.emailVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailVerificationUpdateManyArgs>(args: SelectSubset<T, EmailVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailVerifications and returns the data updated in the database.
     * @param {EmailVerificationUpdateManyAndReturnArgs} args - Arguments to update many EmailVerifications.
     * @example
     * // Update many EmailVerifications
     * const emailVerification = await prisma.emailVerification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailVerifications and only return the `id`
     * const emailVerificationWithIdOnly = await prisma.emailVerification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailVerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailVerification.
     * @param {EmailVerificationUpsertArgs} args - Arguments to update or create a EmailVerification.
     * @example
     * // Update or create a EmailVerification
     * const emailVerification = await prisma.emailVerification.upsert({
     *   create: {
     *     // ... data to create a EmailVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailVerification we want to update
     *   }
     * })
     */
    upsert<T extends EmailVerificationUpsertArgs>(args: SelectSubset<T, EmailVerificationUpsertArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationCountArgs} args - Arguments to filter EmailVerifications to count.
     * @example
     * // Count the number of EmailVerifications
     * const count = await prisma.emailVerification.count({
     *   where: {
     *     // ... the filter for the EmailVerifications we want to count
     *   }
     * })
    **/
    count<T extends EmailVerificationCountArgs>(
      args?: Subset<T, EmailVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailVerificationAggregateArgs>(args: Subset<T, EmailVerificationAggregateArgs>): Prisma.PrismaPromise<GetEmailVerificationAggregateType<T>>

    /**
     * Group by EmailVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailVerificationGroupByArgs['orderBy'] }
        : { orderBy?: EmailVerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailVerification model
   */
  readonly fields: EmailVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailVerification model
   */
  interface EmailVerificationFieldRefs {
    readonly id: FieldRef<"EmailVerification", 'String'>
    readonly userId: FieldRef<"EmailVerification", 'String'>
    readonly token: FieldRef<"EmailVerification", 'String'>
    readonly expiresAt: FieldRef<"EmailVerification", 'DateTime'>
    readonly usedAt: FieldRef<"EmailVerification", 'DateTime'>
    readonly createdAt: FieldRef<"EmailVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailVerification findUnique
   */
  export type EmailVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerification to fetch.
     */
    where: EmailVerificationWhereUniqueInput
  }

  /**
   * EmailVerification findUniqueOrThrow
   */
  export type EmailVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerification to fetch.
     */
    where: EmailVerificationWhereUniqueInput
  }

  /**
   * EmailVerification findFirst
   */
  export type EmailVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerification to fetch.
     */
    where?: EmailVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerifications to fetch.
     */
    orderBy?: EmailVerificationOrderByWithRelationInput | EmailVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailVerifications.
     */
    cursor?: EmailVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailVerifications.
     */
    distinct?: EmailVerificationScalarFieldEnum | EmailVerificationScalarFieldEnum[]
  }

  /**
   * EmailVerification findFirstOrThrow
   */
  export type EmailVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerification to fetch.
     */
    where?: EmailVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerifications to fetch.
     */
    orderBy?: EmailVerificationOrderByWithRelationInput | EmailVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailVerifications.
     */
    cursor?: EmailVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailVerifications.
     */
    distinct?: EmailVerificationScalarFieldEnum | EmailVerificationScalarFieldEnum[]
  }

  /**
   * EmailVerification findMany
   */
  export type EmailVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerifications to fetch.
     */
    where?: EmailVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerifications to fetch.
     */
    orderBy?: EmailVerificationOrderByWithRelationInput | EmailVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailVerifications.
     */
    cursor?: EmailVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerifications.
     */
    skip?: number
    distinct?: EmailVerificationScalarFieldEnum | EmailVerificationScalarFieldEnum[]
  }

  /**
   * EmailVerification create
   */
  export type EmailVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailVerification.
     */
    data: XOR<EmailVerificationCreateInput, EmailVerificationUncheckedCreateInput>
  }

  /**
   * EmailVerification createMany
   */
  export type EmailVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailVerifications.
     */
    data: EmailVerificationCreateManyInput | EmailVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailVerification createManyAndReturn
   */
  export type EmailVerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * The data used to create many EmailVerifications.
     */
    data: EmailVerificationCreateManyInput | EmailVerificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailVerification update
   */
  export type EmailVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailVerification.
     */
    data: XOR<EmailVerificationUpdateInput, EmailVerificationUncheckedUpdateInput>
    /**
     * Choose, which EmailVerification to update.
     */
    where: EmailVerificationWhereUniqueInput
  }

  /**
   * EmailVerification updateMany
   */
  export type EmailVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailVerifications.
     */
    data: XOR<EmailVerificationUpdateManyMutationInput, EmailVerificationUncheckedUpdateManyInput>
    /**
     * Filter which EmailVerifications to update
     */
    where?: EmailVerificationWhereInput
    /**
     * Limit how many EmailVerifications to update.
     */
    limit?: number
  }

  /**
   * EmailVerification updateManyAndReturn
   */
  export type EmailVerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * The data used to update EmailVerifications.
     */
    data: XOR<EmailVerificationUpdateManyMutationInput, EmailVerificationUncheckedUpdateManyInput>
    /**
     * Filter which EmailVerifications to update
     */
    where?: EmailVerificationWhereInput
    /**
     * Limit how many EmailVerifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailVerification upsert
   */
  export type EmailVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailVerification to update in case it exists.
     */
    where: EmailVerificationWhereUniqueInput
    /**
     * In case the EmailVerification found by the `where` argument doesn't exist, create a new EmailVerification with this data.
     */
    create: XOR<EmailVerificationCreateInput, EmailVerificationUncheckedCreateInput>
    /**
     * In case the EmailVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailVerificationUpdateInput, EmailVerificationUncheckedUpdateInput>
  }

  /**
   * EmailVerification delete
   */
  export type EmailVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationInclude<ExtArgs> | null
    /**
     * Filter which EmailVerification to delete.
     */
    where: EmailVerificationWhereUniqueInput
  }

  /**
   * EmailVerification deleteMany
   */
  export type EmailVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailVerifications to delete
     */
    where?: EmailVerificationWhereInput
    /**
     * Limit how many EmailVerifications to delete.
     */
    limit?: number
  }

  /**
   * EmailVerification without action
   */
  export type EmailVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationInclude<ExtArgs> | null
  }


  /**
   * Model SessionNote
   */

  export type AggregateSessionNote = {
    _count: SessionNoteCountAggregateOutputType | null
    _min: SessionNoteMinAggregateOutputType | null
    _max: SessionNoteMaxAggregateOutputType | null
  }

  export type SessionNoteMinAggregateOutputType = {
    id: string | null
    psychologistProfileId: string | null
    userId: string | null
    scheduleId: string | null
    subjective: string | null
    objective: string | null
    assessment: string | null
    plan: string | null
    riskLevel: $Enums.RiskLevel | null
    followUpDate: Date | null
    nextSessionRecommendation: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type SessionNoteMaxAggregateOutputType = {
    id: string | null
    psychologistProfileId: string | null
    userId: string | null
    scheduleId: string | null
    subjective: string | null
    objective: string | null
    assessment: string | null
    plan: string | null
    riskLevel: $Enums.RiskLevel | null
    followUpDate: Date | null
    nextSessionRecommendation: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type SessionNoteCountAggregateOutputType = {
    id: number
    psychologistProfileId: number
    userId: number
    scheduleId: number
    subjective: number
    objective: number
    assessment: number
    plan: number
    riskLevel: number
    followUpDate: number
    nextSessionRecommendation: number
    tags: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type SessionNoteMinAggregateInputType = {
    id?: true
    psychologistProfileId?: true
    userId?: true
    scheduleId?: true
    subjective?: true
    objective?: true
    assessment?: true
    plan?: true
    riskLevel?: true
    followUpDate?: true
    nextSessionRecommendation?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type SessionNoteMaxAggregateInputType = {
    id?: true
    psychologistProfileId?: true
    userId?: true
    scheduleId?: true
    subjective?: true
    objective?: true
    assessment?: true
    plan?: true
    riskLevel?: true
    followUpDate?: true
    nextSessionRecommendation?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type SessionNoteCountAggregateInputType = {
    id?: true
    psychologistProfileId?: true
    userId?: true
    scheduleId?: true
    subjective?: true
    objective?: true
    assessment?: true
    plan?: true
    riskLevel?: true
    followUpDate?: true
    nextSessionRecommendation?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type SessionNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SessionNote to aggregate.
     */
    where?: SessionNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionNotes to fetch.
     */
    orderBy?: SessionNoteOrderByWithRelationInput | SessionNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SessionNotes
    **/
    _count?: true | SessionNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionNoteMaxAggregateInputType
  }

  export type GetSessionNoteAggregateType<T extends SessionNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateSessionNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSessionNote[P]>
      : GetScalarType<T[P], AggregateSessionNote[P]>
  }




  export type SessionNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionNoteWhereInput
    orderBy?: SessionNoteOrderByWithAggregationInput | SessionNoteOrderByWithAggregationInput[]
    by: SessionNoteScalarFieldEnum[] | SessionNoteScalarFieldEnum
    having?: SessionNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionNoteCountAggregateInputType | true
    _min?: SessionNoteMinAggregateInputType
    _max?: SessionNoteMaxAggregateInputType
  }

  export type SessionNoteGroupByOutputType = {
    id: string
    psychologistProfileId: string
    userId: string
    scheduleId: string | null
    subjective: string | null
    objective: string | null
    assessment: string | null
    plan: string | null
    riskLevel: $Enums.RiskLevel
    followUpDate: Date | null
    nextSessionRecommendation: string | null
    tags: string[]
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: SessionNoteCountAggregateOutputType | null
    _min: SessionNoteMinAggregateOutputType | null
    _max: SessionNoteMaxAggregateOutputType | null
  }

  type GetSessionNoteGroupByPayload<T extends SessionNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionNoteGroupByOutputType[P]>
            : GetScalarType<T[P], SessionNoteGroupByOutputType[P]>
        }
      >
    >


  export type SessionNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistProfileId?: boolean
    userId?: boolean
    scheduleId?: boolean
    subjective?: boolean
    objective?: boolean
    assessment?: boolean
    plan?: boolean
    riskLevel?: boolean
    followUpDate?: boolean
    nextSessionRecommendation?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    psychologistProfile?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    schedule?: boolean | SessionNote$scheduleArgs<ExtArgs>
  }, ExtArgs["result"]["sessionNote"]>

  export type SessionNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistProfileId?: boolean
    userId?: boolean
    scheduleId?: boolean
    subjective?: boolean
    objective?: boolean
    assessment?: boolean
    plan?: boolean
    riskLevel?: boolean
    followUpDate?: boolean
    nextSessionRecommendation?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    psychologistProfile?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    schedule?: boolean | SessionNote$scheduleArgs<ExtArgs>
  }, ExtArgs["result"]["sessionNote"]>

  export type SessionNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistProfileId?: boolean
    userId?: boolean
    scheduleId?: boolean
    subjective?: boolean
    objective?: boolean
    assessment?: boolean
    plan?: boolean
    riskLevel?: boolean
    followUpDate?: boolean
    nextSessionRecommendation?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    psychologistProfile?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    schedule?: boolean | SessionNote$scheduleArgs<ExtArgs>
  }, ExtArgs["result"]["sessionNote"]>

  export type SessionNoteSelectScalar = {
    id?: boolean
    psychologistProfileId?: boolean
    userId?: boolean
    scheduleId?: boolean
    subjective?: boolean
    objective?: boolean
    assessment?: boolean
    plan?: boolean
    riskLevel?: boolean
    followUpDate?: boolean
    nextSessionRecommendation?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type SessionNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "psychologistProfileId" | "userId" | "scheduleId" | "subjective" | "objective" | "assessment" | "plan" | "riskLevel" | "followUpDate" | "nextSessionRecommendation" | "tags" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["sessionNote"]>
  export type SessionNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologistProfile?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    schedule?: boolean | SessionNote$scheduleArgs<ExtArgs>
  }
  export type SessionNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologistProfile?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    schedule?: boolean | SessionNote$scheduleArgs<ExtArgs>
  }
  export type SessionNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologistProfile?: boolean | PsychologistProfileDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    schedule?: boolean | SessionNote$scheduleArgs<ExtArgs>
  }

  export type $SessionNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SessionNote"
    objects: {
      psychologistProfile: Prisma.$PsychologistProfilePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      schedule: Prisma.$SchedulePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      psychologistProfileId: string
      userId: string
      scheduleId: string | null
      subjective: string | null
      objective: string | null
      assessment: string | null
      plan: string | null
      riskLevel: $Enums.RiskLevel
      followUpDate: Date | null
      nextSessionRecommendation: string | null
      tags: string[]
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["sessionNote"]>
    composites: {}
  }

  type SessionNoteGetPayload<S extends boolean | null | undefined | SessionNoteDefaultArgs> = $Result.GetResult<Prisma.$SessionNotePayload, S>

  type SessionNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionNoteCountAggregateInputType | true
    }

  export interface SessionNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SessionNote'], meta: { name: 'SessionNote' } }
    /**
     * Find zero or one SessionNote that matches the filter.
     * @param {SessionNoteFindUniqueArgs} args - Arguments to find a SessionNote
     * @example
     * // Get one SessionNote
     * const sessionNote = await prisma.sessionNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionNoteFindUniqueArgs>(args: SelectSubset<T, SessionNoteFindUniqueArgs<ExtArgs>>): Prisma__SessionNoteClient<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SessionNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionNoteFindUniqueOrThrowArgs} args - Arguments to find a SessionNote
     * @example
     * // Get one SessionNote
     * const sessionNote = await prisma.sessionNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionNoteClient<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SessionNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionNoteFindFirstArgs} args - Arguments to find a SessionNote
     * @example
     * // Get one SessionNote
     * const sessionNote = await prisma.sessionNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionNoteFindFirstArgs>(args?: SelectSubset<T, SessionNoteFindFirstArgs<ExtArgs>>): Prisma__SessionNoteClient<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SessionNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionNoteFindFirstOrThrowArgs} args - Arguments to find a SessionNote
     * @example
     * // Get one SessionNote
     * const sessionNote = await prisma.sessionNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionNoteClient<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SessionNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SessionNotes
     * const sessionNotes = await prisma.sessionNote.findMany()
     * 
     * // Get first 10 SessionNotes
     * const sessionNotes = await prisma.sessionNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionNoteWithIdOnly = await prisma.sessionNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionNoteFindManyArgs>(args?: SelectSubset<T, SessionNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SessionNote.
     * @param {SessionNoteCreateArgs} args - Arguments to create a SessionNote.
     * @example
     * // Create one SessionNote
     * const SessionNote = await prisma.sessionNote.create({
     *   data: {
     *     // ... data to create a SessionNote
     *   }
     * })
     * 
     */
    create<T extends SessionNoteCreateArgs>(args: SelectSubset<T, SessionNoteCreateArgs<ExtArgs>>): Prisma__SessionNoteClient<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SessionNotes.
     * @param {SessionNoteCreateManyArgs} args - Arguments to create many SessionNotes.
     * @example
     * // Create many SessionNotes
     * const sessionNote = await prisma.sessionNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionNoteCreateManyArgs>(args?: SelectSubset<T, SessionNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SessionNotes and returns the data saved in the database.
     * @param {SessionNoteCreateManyAndReturnArgs} args - Arguments to create many SessionNotes.
     * @example
     * // Create many SessionNotes
     * const sessionNote = await prisma.sessionNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SessionNotes and only return the `id`
     * const sessionNoteWithIdOnly = await prisma.sessionNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SessionNote.
     * @param {SessionNoteDeleteArgs} args - Arguments to delete one SessionNote.
     * @example
     * // Delete one SessionNote
     * const SessionNote = await prisma.sessionNote.delete({
     *   where: {
     *     // ... filter to delete one SessionNote
     *   }
     * })
     * 
     */
    delete<T extends SessionNoteDeleteArgs>(args: SelectSubset<T, SessionNoteDeleteArgs<ExtArgs>>): Prisma__SessionNoteClient<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SessionNote.
     * @param {SessionNoteUpdateArgs} args - Arguments to update one SessionNote.
     * @example
     * // Update one SessionNote
     * const sessionNote = await prisma.sessionNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionNoteUpdateArgs>(args: SelectSubset<T, SessionNoteUpdateArgs<ExtArgs>>): Prisma__SessionNoteClient<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SessionNotes.
     * @param {SessionNoteDeleteManyArgs} args - Arguments to filter SessionNotes to delete.
     * @example
     * // Delete a few SessionNotes
     * const { count } = await prisma.sessionNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionNoteDeleteManyArgs>(args?: SelectSubset<T, SessionNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SessionNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SessionNotes
     * const sessionNote = await prisma.sessionNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionNoteUpdateManyArgs>(args: SelectSubset<T, SessionNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SessionNotes and returns the data updated in the database.
     * @param {SessionNoteUpdateManyAndReturnArgs} args - Arguments to update many SessionNotes.
     * @example
     * // Update many SessionNotes
     * const sessionNote = await prisma.sessionNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SessionNotes and only return the `id`
     * const sessionNoteWithIdOnly = await prisma.sessionNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SessionNote.
     * @param {SessionNoteUpsertArgs} args - Arguments to update or create a SessionNote.
     * @example
     * // Update or create a SessionNote
     * const sessionNote = await prisma.sessionNote.upsert({
     *   create: {
     *     // ... data to create a SessionNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SessionNote we want to update
     *   }
     * })
     */
    upsert<T extends SessionNoteUpsertArgs>(args: SelectSubset<T, SessionNoteUpsertArgs<ExtArgs>>): Prisma__SessionNoteClient<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SessionNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionNoteCountArgs} args - Arguments to filter SessionNotes to count.
     * @example
     * // Count the number of SessionNotes
     * const count = await prisma.sessionNote.count({
     *   where: {
     *     // ... the filter for the SessionNotes we want to count
     *   }
     * })
    **/
    count<T extends SessionNoteCountArgs>(
      args?: Subset<T, SessionNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SessionNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionNoteAggregateArgs>(args: Subset<T, SessionNoteAggregateArgs>): Prisma.PrismaPromise<GetSessionNoteAggregateType<T>>

    /**
     * Group by SessionNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionNoteGroupByArgs['orderBy'] }
        : { orderBy?: SessionNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SessionNote model
   */
  readonly fields: SessionNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SessionNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    psychologistProfile<T extends PsychologistProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistProfileDefaultArgs<ExtArgs>>): Prisma__PsychologistProfileClient<$Result.GetResult<Prisma.$PsychologistProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    schedule<T extends SessionNote$scheduleArgs<ExtArgs> = {}>(args?: Subset<T, SessionNote$scheduleArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SessionNote model
   */
  interface SessionNoteFieldRefs {
    readonly id: FieldRef<"SessionNote", 'String'>
    readonly psychologistProfileId: FieldRef<"SessionNote", 'String'>
    readonly userId: FieldRef<"SessionNote", 'String'>
    readonly scheduleId: FieldRef<"SessionNote", 'String'>
    readonly subjective: FieldRef<"SessionNote", 'String'>
    readonly objective: FieldRef<"SessionNote", 'String'>
    readonly assessment: FieldRef<"SessionNote", 'String'>
    readonly plan: FieldRef<"SessionNote", 'String'>
    readonly riskLevel: FieldRef<"SessionNote", 'RiskLevel'>
    readonly followUpDate: FieldRef<"SessionNote", 'DateTime'>
    readonly nextSessionRecommendation: FieldRef<"SessionNote", 'String'>
    readonly tags: FieldRef<"SessionNote", 'String[]'>
    readonly createdAt: FieldRef<"SessionNote", 'DateTime'>
    readonly updatedAt: FieldRef<"SessionNote", 'DateTime'>
    readonly deletedAt: FieldRef<"SessionNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SessionNote findUnique
   */
  export type SessionNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteInclude<ExtArgs> | null
    /**
     * Filter, which SessionNote to fetch.
     */
    where: SessionNoteWhereUniqueInput
  }

  /**
   * SessionNote findUniqueOrThrow
   */
  export type SessionNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteInclude<ExtArgs> | null
    /**
     * Filter, which SessionNote to fetch.
     */
    where: SessionNoteWhereUniqueInput
  }

  /**
   * SessionNote findFirst
   */
  export type SessionNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteInclude<ExtArgs> | null
    /**
     * Filter, which SessionNote to fetch.
     */
    where?: SessionNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionNotes to fetch.
     */
    orderBy?: SessionNoteOrderByWithRelationInput | SessionNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SessionNotes.
     */
    cursor?: SessionNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SessionNotes.
     */
    distinct?: SessionNoteScalarFieldEnum | SessionNoteScalarFieldEnum[]
  }

  /**
   * SessionNote findFirstOrThrow
   */
  export type SessionNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteInclude<ExtArgs> | null
    /**
     * Filter, which SessionNote to fetch.
     */
    where?: SessionNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionNotes to fetch.
     */
    orderBy?: SessionNoteOrderByWithRelationInput | SessionNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SessionNotes.
     */
    cursor?: SessionNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SessionNotes.
     */
    distinct?: SessionNoteScalarFieldEnum | SessionNoteScalarFieldEnum[]
  }

  /**
   * SessionNote findMany
   */
  export type SessionNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteInclude<ExtArgs> | null
    /**
     * Filter, which SessionNotes to fetch.
     */
    where?: SessionNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionNotes to fetch.
     */
    orderBy?: SessionNoteOrderByWithRelationInput | SessionNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SessionNotes.
     */
    cursor?: SessionNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionNotes.
     */
    skip?: number
    distinct?: SessionNoteScalarFieldEnum | SessionNoteScalarFieldEnum[]
  }

  /**
   * SessionNote create
   */
  export type SessionNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a SessionNote.
     */
    data: XOR<SessionNoteCreateInput, SessionNoteUncheckedCreateInput>
  }

  /**
   * SessionNote createMany
   */
  export type SessionNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SessionNotes.
     */
    data: SessionNoteCreateManyInput | SessionNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SessionNote createManyAndReturn
   */
  export type SessionNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * The data used to create many SessionNotes.
     */
    data: SessionNoteCreateManyInput | SessionNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SessionNote update
   */
  export type SessionNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a SessionNote.
     */
    data: XOR<SessionNoteUpdateInput, SessionNoteUncheckedUpdateInput>
    /**
     * Choose, which SessionNote to update.
     */
    where: SessionNoteWhereUniqueInput
  }

  /**
   * SessionNote updateMany
   */
  export type SessionNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SessionNotes.
     */
    data: XOR<SessionNoteUpdateManyMutationInput, SessionNoteUncheckedUpdateManyInput>
    /**
     * Filter which SessionNotes to update
     */
    where?: SessionNoteWhereInput
    /**
     * Limit how many SessionNotes to update.
     */
    limit?: number
  }

  /**
   * SessionNote updateManyAndReturn
   */
  export type SessionNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * The data used to update SessionNotes.
     */
    data: XOR<SessionNoteUpdateManyMutationInput, SessionNoteUncheckedUpdateManyInput>
    /**
     * Filter which SessionNotes to update
     */
    where?: SessionNoteWhereInput
    /**
     * Limit how many SessionNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SessionNote upsert
   */
  export type SessionNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the SessionNote to update in case it exists.
     */
    where: SessionNoteWhereUniqueInput
    /**
     * In case the SessionNote found by the `where` argument doesn't exist, create a new SessionNote with this data.
     */
    create: XOR<SessionNoteCreateInput, SessionNoteUncheckedCreateInput>
    /**
     * In case the SessionNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionNoteUpdateInput, SessionNoteUncheckedUpdateInput>
  }

  /**
   * SessionNote delete
   */
  export type SessionNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteInclude<ExtArgs> | null
    /**
     * Filter which SessionNote to delete.
     */
    where: SessionNoteWhereUniqueInput
  }

  /**
   * SessionNote deleteMany
   */
  export type SessionNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SessionNotes to delete
     */
    where?: SessionNoteWhereInput
    /**
     * Limit how many SessionNotes to delete.
     */
    limit?: number
  }

  /**
   * SessionNote.schedule
   */
  export type SessionNote$scheduleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
  }

  /**
   * SessionNote without action
   */
  export type SessionNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionNote
     */
    select?: SessionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionNote
     */
    omit?: SessionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionNoteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    role: 'role',
    isEmailVerified: 'isEmailVerified',
    isProfileComplete: 'isProfileComplete',
    isFirstLogin: 'isFirstLogin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AuthProviderScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerId: 'providerId',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AuthProviderScalarFieldEnum = (typeof AuthProviderScalarFieldEnum)[keyof typeof AuthProviderScalarFieldEnum]


  export const PasswordResetScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
  };

  export type PasswordResetScalarFieldEnum = (typeof PasswordResetScalarFieldEnum)[keyof typeof PasswordResetScalarFieldEnum]


  export const UserProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fullName: 'fullName',
    birthday: 'birthday',
    gender: 'gender',
    country: 'country',
    city: 'city',
    fullAddress: 'fullAddress',
    phone: 'phone'
  };

  export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum]


  export const PsychologistProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fullName: 'fullName',
    sipp: 'sipp',
    str: 'str',
    about: 'about',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PsychologistProfileScalarFieldEnum = (typeof PsychologistProfileScalarFieldEnum)[keyof typeof PsychologistProfileScalarFieldEnum]


  export const EducationScalarFieldEnum: {
    id: 'id',
    psychologistId: 'psychologistId',
    degree: 'degree',
    institution: 'institution',
    city: 'city',
    startYear: 'startYear',
    endYear: 'endYear',
    createdAt: 'createdAt'
  };

  export type EducationScalarFieldEnum = (typeof EducationScalarFieldEnum)[keyof typeof EducationScalarFieldEnum]


  export const ExperienceScalarFieldEnum: {
    id: 'id',
    psychologistId: 'psychologistId',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type ExperienceScalarFieldEnum = (typeof ExperienceScalarFieldEnum)[keyof typeof ExperienceScalarFieldEnum]


  export const SpecializationScalarFieldEnum: {
    id: 'id',
    psychologistId: 'psychologistId',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type SpecializationScalarFieldEnum = (typeof SpecializationScalarFieldEnum)[keyof typeof SpecializationScalarFieldEnum]


  export const ExpertiseScalarFieldEnum: {
    id: 'id',
    psychologistId: 'psychologistId',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type ExpertiseScalarFieldEnum = (typeof ExpertiseScalarFieldEnum)[keyof typeof ExpertiseScalarFieldEnum]


  export const ScheduleScalarFieldEnum: {
    id: 'id',
    psychologistId: 'psychologistId',
    date: 'date',
    startTime: 'startTime',
    duration: 'duration',
    isAvailable: 'isAvailable',
    createdAt: 'createdAt'
  };

  export type ScheduleScalarFieldEnum = (typeof ScheduleScalarFieldEnum)[keyof typeof ScheduleScalarFieldEnum]


  export const EmailVerificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
  };

  export type EmailVerificationScalarFieldEnum = (typeof EmailVerificationScalarFieldEnum)[keyof typeof EmailVerificationScalarFieldEnum]


  export const SessionNoteScalarFieldEnum: {
    id: 'id',
    psychologistProfileId: 'psychologistProfileId',
    userId: 'userId',
    scheduleId: 'scheduleId',
    subjective: 'subjective',
    objective: 'objective',
    assessment: 'assessment',
    plan: 'plan',
    riskLevel: 'riskLevel',
    followUpDate: 'followUpDate',
    nextSessionRecommendation: 'nextSessionRecommendation',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type SessionNoteScalarFieldEnum = (typeof SessionNoteScalarFieldEnum)[keyof typeof SessionNoteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'RiskLevel'
   */
  export type EnumRiskLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskLevel'>
    


  /**
   * Reference to a field of type 'RiskLevel[]'
   */
  export type ListEnumRiskLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskLevel[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isEmailVerified?: BoolFilter<"User"> | boolean
    isProfileComplete?: BoolFilter<"User"> | boolean
    isFirstLogin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    authProvider?: XOR<AuthProviderNullableScalarRelationFilter, AuthProviderWhereInput> | null
    passwordResets?: PasswordResetListRelationFilter
    userProfile?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
    psychologistProfile?: XOR<PsychologistProfileNullableScalarRelationFilter, PsychologistProfileWhereInput> | null
    emailVerifications?: EmailVerificationListRelationFilter
    sessionNotes?: SessionNoteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    isProfileComplete?: SortOrder
    isFirstLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authProvider?: AuthProviderOrderByWithRelationInput
    passwordResets?: PasswordResetOrderByRelationAggregateInput
    userProfile?: UserProfileOrderByWithRelationInput
    psychologistProfile?: PsychologistProfileOrderByWithRelationInput
    emailVerifications?: EmailVerificationOrderByRelationAggregateInput
    sessionNotes?: SessionNoteOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isEmailVerified?: BoolFilter<"User"> | boolean
    isProfileComplete?: BoolFilter<"User"> | boolean
    isFirstLogin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    authProvider?: XOR<AuthProviderNullableScalarRelationFilter, AuthProviderWhereInput> | null
    passwordResets?: PasswordResetListRelationFilter
    userProfile?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
    psychologistProfile?: XOR<PsychologistProfileNullableScalarRelationFilter, PsychologistProfileWhereInput> | null
    emailVerifications?: EmailVerificationListRelationFilter
    sessionNotes?: SessionNoteListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    isProfileComplete?: SortOrder
    isFirstLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isEmailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    isProfileComplete?: BoolWithAggregatesFilter<"User"> | boolean
    isFirstLogin?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AuthProviderWhereInput = {
    AND?: AuthProviderWhereInput | AuthProviderWhereInput[]
    OR?: AuthProviderWhereInput[]
    NOT?: AuthProviderWhereInput | AuthProviderWhereInput[]
    id?: StringFilter<"AuthProvider"> | string
    userId?: StringFilter<"AuthProvider"> | string
    provider?: StringFilter<"AuthProvider"> | string
    providerId?: StringNullableFilter<"AuthProvider"> | string | null
    passwordHash?: StringNullableFilter<"AuthProvider"> | string | null
    createdAt?: DateTimeFilter<"AuthProvider"> | Date | string
    updatedAt?: DateTimeFilter<"AuthProvider"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuthProviderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuthProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    provider_providerId?: AuthProviderProviderProviderIdCompoundUniqueInput
    AND?: AuthProviderWhereInput | AuthProviderWhereInput[]
    OR?: AuthProviderWhereInput[]
    NOT?: AuthProviderWhereInput | AuthProviderWhereInput[]
    provider?: StringFilter<"AuthProvider"> | string
    providerId?: StringNullableFilter<"AuthProvider"> | string | null
    passwordHash?: StringNullableFilter<"AuthProvider"> | string | null
    createdAt?: DateTimeFilter<"AuthProvider"> | Date | string
    updatedAt?: DateTimeFilter<"AuthProvider"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId" | "provider_providerId">

  export type AuthProviderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AuthProviderCountOrderByAggregateInput
    _max?: AuthProviderMaxOrderByAggregateInput
    _min?: AuthProviderMinOrderByAggregateInput
  }

  export type AuthProviderScalarWhereWithAggregatesInput = {
    AND?: AuthProviderScalarWhereWithAggregatesInput | AuthProviderScalarWhereWithAggregatesInput[]
    OR?: AuthProviderScalarWhereWithAggregatesInput[]
    NOT?: AuthProviderScalarWhereWithAggregatesInput | AuthProviderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthProvider"> | string
    userId?: StringWithAggregatesFilter<"AuthProvider"> | string
    provider?: StringWithAggregatesFilter<"AuthProvider"> | string
    providerId?: StringNullableWithAggregatesFilter<"AuthProvider"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"AuthProvider"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuthProvider"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AuthProvider"> | Date | string
  }

  export type PasswordResetWhereInput = {
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    id?: StringFilter<"PasswordReset"> | string
    userId?: StringFilter<"PasswordReset"> | string
    token?: StringFilter<"PasswordReset"> | string
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
    usedAt?: DateTimeNullableFilter<"PasswordReset"> | Date | string | null
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordResetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    userId?: StringFilter<"PasswordReset"> | string
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
    usedAt?: DateTimeNullableFilter<"PasswordReset"> | Date | string | null
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type PasswordResetOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PasswordResetCountOrderByAggregateInput
    _max?: PasswordResetMaxOrderByAggregateInput
    _min?: PasswordResetMinOrderByAggregateInput
  }

  export type PasswordResetScalarWhereWithAggregatesInput = {
    AND?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    OR?: PasswordResetScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordReset"> | string
    userId?: StringWithAggregatesFilter<"PasswordReset"> | string
    token?: StringWithAggregatesFilter<"PasswordReset"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"PasswordReset"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
  }

  export type UserProfileWhereInput = {
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    id?: StringFilter<"UserProfile"> | string
    userId?: StringFilter<"UserProfile"> | string
    fullName?: StringNullableFilter<"UserProfile"> | string | null
    birthday?: DateTimeNullableFilter<"UserProfile"> | Date | string | null
    gender?: EnumGenderNullableFilter<"UserProfile"> | $Enums.Gender | null
    country?: StringNullableFilter<"UserProfile"> | string | null
    city?: StringNullableFilter<"UserProfile"> | string | null
    fullAddress?: StringNullableFilter<"UserProfile"> | string | null
    phone?: StringNullableFilter<"UserProfile"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    fullAddress?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    fullName?: StringNullableFilter<"UserProfile"> | string | null
    birthday?: DateTimeNullableFilter<"UserProfile"> | Date | string | null
    gender?: EnumGenderNullableFilter<"UserProfile"> | $Enums.Gender | null
    country?: StringNullableFilter<"UserProfile"> | string | null
    city?: StringNullableFilter<"UserProfile"> | string | null
    fullAddress?: StringNullableFilter<"UserProfile"> | string | null
    phone?: StringNullableFilter<"UserProfile"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    fullAddress?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    _count?: UserProfileCountOrderByAggregateInput
    _max?: UserProfileMaxOrderByAggregateInput
    _min?: UserProfileMinOrderByAggregateInput
  }

  export type UserProfileScalarWhereWithAggregatesInput = {
    AND?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    OR?: UserProfileScalarWhereWithAggregatesInput[]
    NOT?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserProfile"> | string
    userId?: StringWithAggregatesFilter<"UserProfile"> | string
    fullName?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    birthday?: DateTimeNullableWithAggregatesFilter<"UserProfile"> | Date | string | null
    gender?: EnumGenderNullableWithAggregatesFilter<"UserProfile"> | $Enums.Gender | null
    country?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    city?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    fullAddress?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    phone?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
  }

  export type PsychologistProfileWhereInput = {
    AND?: PsychologistProfileWhereInput | PsychologistProfileWhereInput[]
    OR?: PsychologistProfileWhereInput[]
    NOT?: PsychologistProfileWhereInput | PsychologistProfileWhereInput[]
    id?: StringFilter<"PsychologistProfile"> | string
    userId?: StringFilter<"PsychologistProfile"> | string
    fullName?: StringFilter<"PsychologistProfile"> | string
    sipp?: StringFilter<"PsychologistProfile"> | string
    str?: StringFilter<"PsychologistProfile"> | string
    about?: StringFilter<"PsychologistProfile"> | string
    avatarUrl?: StringNullableFilter<"PsychologistProfile"> | string | null
    createdAt?: DateTimeFilter<"PsychologistProfile"> | Date | string
    updatedAt?: DateTimeFilter<"PsychologistProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    educations?: EducationListRelationFilter
    experiences?: ExperienceListRelationFilter
    specializations?: SpecializationListRelationFilter
    expertises?: ExpertiseListRelationFilter
    schedules?: ScheduleListRelationFilter
    sessionNotes?: SessionNoteListRelationFilter
  }

  export type PsychologistProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    sipp?: SortOrder
    str?: SortOrder
    about?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    educations?: EducationOrderByRelationAggregateInput
    experiences?: ExperienceOrderByRelationAggregateInput
    specializations?: SpecializationOrderByRelationAggregateInput
    expertises?: ExpertiseOrderByRelationAggregateInput
    schedules?: ScheduleOrderByRelationAggregateInput
    sessionNotes?: SessionNoteOrderByRelationAggregateInput
  }

  export type PsychologistProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: PsychologistProfileWhereInput | PsychologistProfileWhereInput[]
    OR?: PsychologistProfileWhereInput[]
    NOT?: PsychologistProfileWhereInput | PsychologistProfileWhereInput[]
    fullName?: StringFilter<"PsychologistProfile"> | string
    sipp?: StringFilter<"PsychologistProfile"> | string
    str?: StringFilter<"PsychologistProfile"> | string
    about?: StringFilter<"PsychologistProfile"> | string
    avatarUrl?: StringNullableFilter<"PsychologistProfile"> | string | null
    createdAt?: DateTimeFilter<"PsychologistProfile"> | Date | string
    updatedAt?: DateTimeFilter<"PsychologistProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    educations?: EducationListRelationFilter
    experiences?: ExperienceListRelationFilter
    specializations?: SpecializationListRelationFilter
    expertises?: ExpertiseListRelationFilter
    schedules?: ScheduleListRelationFilter
    sessionNotes?: SessionNoteListRelationFilter
  }, "id" | "userId">

  export type PsychologistProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    sipp?: SortOrder
    str?: SortOrder
    about?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PsychologistProfileCountOrderByAggregateInput
    _max?: PsychologistProfileMaxOrderByAggregateInput
    _min?: PsychologistProfileMinOrderByAggregateInput
  }

  export type PsychologistProfileScalarWhereWithAggregatesInput = {
    AND?: PsychologistProfileScalarWhereWithAggregatesInput | PsychologistProfileScalarWhereWithAggregatesInput[]
    OR?: PsychologistProfileScalarWhereWithAggregatesInput[]
    NOT?: PsychologistProfileScalarWhereWithAggregatesInput | PsychologistProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PsychologistProfile"> | string
    userId?: StringWithAggregatesFilter<"PsychologistProfile"> | string
    fullName?: StringWithAggregatesFilter<"PsychologistProfile"> | string
    sipp?: StringWithAggregatesFilter<"PsychologistProfile"> | string
    str?: StringWithAggregatesFilter<"PsychologistProfile"> | string
    about?: StringWithAggregatesFilter<"PsychologistProfile"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"PsychologistProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PsychologistProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PsychologistProfile"> | Date | string
  }

  export type EducationWhereInput = {
    AND?: EducationWhereInput | EducationWhereInput[]
    OR?: EducationWhereInput[]
    NOT?: EducationWhereInput | EducationWhereInput[]
    id?: StringFilter<"Education"> | string
    psychologistId?: StringFilter<"Education"> | string
    degree?: StringFilter<"Education"> | string
    institution?: StringFilter<"Education"> | string
    city?: StringFilter<"Education"> | string
    startYear?: IntFilter<"Education"> | number
    endYear?: IntFilter<"Education"> | number
    createdAt?: DateTimeFilter<"Education"> | Date | string
    psychologist?: XOR<PsychologistProfileScalarRelationFilter, PsychologistProfileWhereInput>
  }

  export type EducationOrderByWithRelationInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    city?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    createdAt?: SortOrder
    psychologist?: PsychologistProfileOrderByWithRelationInput
  }

  export type EducationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EducationWhereInput | EducationWhereInput[]
    OR?: EducationWhereInput[]
    NOT?: EducationWhereInput | EducationWhereInput[]
    psychologistId?: StringFilter<"Education"> | string
    degree?: StringFilter<"Education"> | string
    institution?: StringFilter<"Education"> | string
    city?: StringFilter<"Education"> | string
    startYear?: IntFilter<"Education"> | number
    endYear?: IntFilter<"Education"> | number
    createdAt?: DateTimeFilter<"Education"> | Date | string
    psychologist?: XOR<PsychologistProfileScalarRelationFilter, PsychologistProfileWhereInput>
  }, "id">

  export type EducationOrderByWithAggregationInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    city?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    createdAt?: SortOrder
    _count?: EducationCountOrderByAggregateInput
    _avg?: EducationAvgOrderByAggregateInput
    _max?: EducationMaxOrderByAggregateInput
    _min?: EducationMinOrderByAggregateInput
    _sum?: EducationSumOrderByAggregateInput
  }

  export type EducationScalarWhereWithAggregatesInput = {
    AND?: EducationScalarWhereWithAggregatesInput | EducationScalarWhereWithAggregatesInput[]
    OR?: EducationScalarWhereWithAggregatesInput[]
    NOT?: EducationScalarWhereWithAggregatesInput | EducationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Education"> | string
    psychologistId?: StringWithAggregatesFilter<"Education"> | string
    degree?: StringWithAggregatesFilter<"Education"> | string
    institution?: StringWithAggregatesFilter<"Education"> | string
    city?: StringWithAggregatesFilter<"Education"> | string
    startYear?: IntWithAggregatesFilter<"Education"> | number
    endYear?: IntWithAggregatesFilter<"Education"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Education"> | Date | string
  }

  export type ExperienceWhereInput = {
    AND?: ExperienceWhereInput | ExperienceWhereInput[]
    OR?: ExperienceWhereInput[]
    NOT?: ExperienceWhereInput | ExperienceWhereInput[]
    id?: StringFilter<"Experience"> | string
    psychologistId?: StringFilter<"Experience"> | string
    name?: StringFilter<"Experience"> | string
    createdAt?: DateTimeFilter<"Experience"> | Date | string
    psychologist?: XOR<PsychologistProfileScalarRelationFilter, PsychologistProfileWhereInput>
  }

  export type ExperienceOrderByWithRelationInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    psychologist?: PsychologistProfileOrderByWithRelationInput
  }

  export type ExperienceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExperienceWhereInput | ExperienceWhereInput[]
    OR?: ExperienceWhereInput[]
    NOT?: ExperienceWhereInput | ExperienceWhereInput[]
    psychologistId?: StringFilter<"Experience"> | string
    name?: StringFilter<"Experience"> | string
    createdAt?: DateTimeFilter<"Experience"> | Date | string
    psychologist?: XOR<PsychologistProfileScalarRelationFilter, PsychologistProfileWhereInput>
  }, "id">

  export type ExperienceOrderByWithAggregationInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: ExperienceCountOrderByAggregateInput
    _max?: ExperienceMaxOrderByAggregateInput
    _min?: ExperienceMinOrderByAggregateInput
  }

  export type ExperienceScalarWhereWithAggregatesInput = {
    AND?: ExperienceScalarWhereWithAggregatesInput | ExperienceScalarWhereWithAggregatesInput[]
    OR?: ExperienceScalarWhereWithAggregatesInput[]
    NOT?: ExperienceScalarWhereWithAggregatesInput | ExperienceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Experience"> | string
    psychologistId?: StringWithAggregatesFilter<"Experience"> | string
    name?: StringWithAggregatesFilter<"Experience"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Experience"> | Date | string
  }

  export type SpecializationWhereInput = {
    AND?: SpecializationWhereInput | SpecializationWhereInput[]
    OR?: SpecializationWhereInput[]
    NOT?: SpecializationWhereInput | SpecializationWhereInput[]
    id?: StringFilter<"Specialization"> | string
    psychologistId?: StringFilter<"Specialization"> | string
    name?: StringFilter<"Specialization"> | string
    createdAt?: DateTimeFilter<"Specialization"> | Date | string
    psychologist?: XOR<PsychologistProfileScalarRelationFilter, PsychologistProfileWhereInput>
  }

  export type SpecializationOrderByWithRelationInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    psychologist?: PsychologistProfileOrderByWithRelationInput
  }

  export type SpecializationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SpecializationWhereInput | SpecializationWhereInput[]
    OR?: SpecializationWhereInput[]
    NOT?: SpecializationWhereInput | SpecializationWhereInput[]
    psychologistId?: StringFilter<"Specialization"> | string
    name?: StringFilter<"Specialization"> | string
    createdAt?: DateTimeFilter<"Specialization"> | Date | string
    psychologist?: XOR<PsychologistProfileScalarRelationFilter, PsychologistProfileWhereInput>
  }, "id">

  export type SpecializationOrderByWithAggregationInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: SpecializationCountOrderByAggregateInput
    _max?: SpecializationMaxOrderByAggregateInput
    _min?: SpecializationMinOrderByAggregateInput
  }

  export type SpecializationScalarWhereWithAggregatesInput = {
    AND?: SpecializationScalarWhereWithAggregatesInput | SpecializationScalarWhereWithAggregatesInput[]
    OR?: SpecializationScalarWhereWithAggregatesInput[]
    NOT?: SpecializationScalarWhereWithAggregatesInput | SpecializationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Specialization"> | string
    psychologistId?: StringWithAggregatesFilter<"Specialization"> | string
    name?: StringWithAggregatesFilter<"Specialization"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Specialization"> | Date | string
  }

  export type ExpertiseWhereInput = {
    AND?: ExpertiseWhereInput | ExpertiseWhereInput[]
    OR?: ExpertiseWhereInput[]
    NOT?: ExpertiseWhereInput | ExpertiseWhereInput[]
    id?: StringFilter<"Expertise"> | string
    psychologistId?: StringFilter<"Expertise"> | string
    name?: StringFilter<"Expertise"> | string
    createdAt?: DateTimeFilter<"Expertise"> | Date | string
    psychologist?: XOR<PsychologistProfileScalarRelationFilter, PsychologistProfileWhereInput>
  }

  export type ExpertiseOrderByWithRelationInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    psychologist?: PsychologistProfileOrderByWithRelationInput
  }

  export type ExpertiseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExpertiseWhereInput | ExpertiseWhereInput[]
    OR?: ExpertiseWhereInput[]
    NOT?: ExpertiseWhereInput | ExpertiseWhereInput[]
    psychologistId?: StringFilter<"Expertise"> | string
    name?: StringFilter<"Expertise"> | string
    createdAt?: DateTimeFilter<"Expertise"> | Date | string
    psychologist?: XOR<PsychologistProfileScalarRelationFilter, PsychologistProfileWhereInput>
  }, "id">

  export type ExpertiseOrderByWithAggregationInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: ExpertiseCountOrderByAggregateInput
    _max?: ExpertiseMaxOrderByAggregateInput
    _min?: ExpertiseMinOrderByAggregateInput
  }

  export type ExpertiseScalarWhereWithAggregatesInput = {
    AND?: ExpertiseScalarWhereWithAggregatesInput | ExpertiseScalarWhereWithAggregatesInput[]
    OR?: ExpertiseScalarWhereWithAggregatesInput[]
    NOT?: ExpertiseScalarWhereWithAggregatesInput | ExpertiseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Expertise"> | string
    psychologistId?: StringWithAggregatesFilter<"Expertise"> | string
    name?: StringWithAggregatesFilter<"Expertise"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Expertise"> | Date | string
  }

  export type ScheduleWhereInput = {
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    id?: StringFilter<"Schedule"> | string
    psychologistId?: StringFilter<"Schedule"> | string
    date?: DateTimeFilter<"Schedule"> | Date | string
    startTime?: StringFilter<"Schedule"> | string
    duration?: IntFilter<"Schedule"> | number
    isAvailable?: BoolFilter<"Schedule"> | boolean
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    psychologist?: XOR<PsychologistProfileScalarRelationFilter, PsychologistProfileWhereInput>
    sessionNote?: XOR<SessionNoteNullableScalarRelationFilter, SessionNoteWhereInput> | null
  }

  export type ScheduleOrderByWithRelationInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    psychologist?: PsychologistProfileOrderByWithRelationInput
    sessionNote?: SessionNoteOrderByWithRelationInput
  }

  export type ScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    psychologistId?: StringFilter<"Schedule"> | string
    date?: DateTimeFilter<"Schedule"> | Date | string
    startTime?: StringFilter<"Schedule"> | string
    duration?: IntFilter<"Schedule"> | number
    isAvailable?: BoolFilter<"Schedule"> | boolean
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    psychologist?: XOR<PsychologistProfileScalarRelationFilter, PsychologistProfileWhereInput>
    sessionNote?: XOR<SessionNoteNullableScalarRelationFilter, SessionNoteWhereInput> | null
  }, "id">

  export type ScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    _count?: ScheduleCountOrderByAggregateInput
    _avg?: ScheduleAvgOrderByAggregateInput
    _max?: ScheduleMaxOrderByAggregateInput
    _min?: ScheduleMinOrderByAggregateInput
    _sum?: ScheduleSumOrderByAggregateInput
  }

  export type ScheduleScalarWhereWithAggregatesInput = {
    AND?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    OR?: ScheduleScalarWhereWithAggregatesInput[]
    NOT?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Schedule"> | string
    psychologistId?: StringWithAggregatesFilter<"Schedule"> | string
    date?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
    startTime?: StringWithAggregatesFilter<"Schedule"> | string
    duration?: IntWithAggregatesFilter<"Schedule"> | number
    isAvailable?: BoolWithAggregatesFilter<"Schedule"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
  }

  export type EmailVerificationWhereInput = {
    AND?: EmailVerificationWhereInput | EmailVerificationWhereInput[]
    OR?: EmailVerificationWhereInput[]
    NOT?: EmailVerificationWhereInput | EmailVerificationWhereInput[]
    id?: StringFilter<"EmailVerification"> | string
    userId?: StringFilter<"EmailVerification"> | string
    token?: StringFilter<"EmailVerification"> | string
    expiresAt?: DateTimeFilter<"EmailVerification"> | Date | string
    usedAt?: DateTimeNullableFilter<"EmailVerification"> | Date | string | null
    createdAt?: DateTimeFilter<"EmailVerification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EmailVerificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type EmailVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: EmailVerificationWhereInput | EmailVerificationWhereInput[]
    OR?: EmailVerificationWhereInput[]
    NOT?: EmailVerificationWhereInput | EmailVerificationWhereInput[]
    userId?: StringFilter<"EmailVerification"> | string
    expiresAt?: DateTimeFilter<"EmailVerification"> | Date | string
    usedAt?: DateTimeNullableFilter<"EmailVerification"> | Date | string | null
    createdAt?: DateTimeFilter<"EmailVerification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type EmailVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EmailVerificationCountOrderByAggregateInput
    _max?: EmailVerificationMaxOrderByAggregateInput
    _min?: EmailVerificationMinOrderByAggregateInput
  }

  export type EmailVerificationScalarWhereWithAggregatesInput = {
    AND?: EmailVerificationScalarWhereWithAggregatesInput | EmailVerificationScalarWhereWithAggregatesInput[]
    OR?: EmailVerificationScalarWhereWithAggregatesInput[]
    NOT?: EmailVerificationScalarWhereWithAggregatesInput | EmailVerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailVerification"> | string
    userId?: StringWithAggregatesFilter<"EmailVerification"> | string
    token?: StringWithAggregatesFilter<"EmailVerification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"EmailVerification"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"EmailVerification"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EmailVerification"> | Date | string
  }

  export type SessionNoteWhereInput = {
    AND?: SessionNoteWhereInput | SessionNoteWhereInput[]
    OR?: SessionNoteWhereInput[]
    NOT?: SessionNoteWhereInput | SessionNoteWhereInput[]
    id?: StringFilter<"SessionNote"> | string
    psychologistProfileId?: StringFilter<"SessionNote"> | string
    userId?: StringFilter<"SessionNote"> | string
    scheduleId?: StringNullableFilter<"SessionNote"> | string | null
    subjective?: StringNullableFilter<"SessionNote"> | string | null
    objective?: StringNullableFilter<"SessionNote"> | string | null
    assessment?: StringNullableFilter<"SessionNote"> | string | null
    plan?: StringNullableFilter<"SessionNote"> | string | null
    riskLevel?: EnumRiskLevelFilter<"SessionNote"> | $Enums.RiskLevel
    followUpDate?: DateTimeNullableFilter<"SessionNote"> | Date | string | null
    nextSessionRecommendation?: StringNullableFilter<"SessionNote"> | string | null
    tags?: StringNullableListFilter<"SessionNote">
    createdAt?: DateTimeFilter<"SessionNote"> | Date | string
    updatedAt?: DateTimeFilter<"SessionNote"> | Date | string
    deletedAt?: DateTimeNullableFilter<"SessionNote"> | Date | string | null
    psychologistProfile?: XOR<PsychologistProfileScalarRelationFilter, PsychologistProfileWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    schedule?: XOR<ScheduleNullableScalarRelationFilter, ScheduleWhereInput> | null
  }

  export type SessionNoteOrderByWithRelationInput = {
    id?: SortOrder
    psychologistProfileId?: SortOrder
    userId?: SortOrder
    scheduleId?: SortOrderInput | SortOrder
    subjective?: SortOrderInput | SortOrder
    objective?: SortOrderInput | SortOrder
    assessment?: SortOrderInput | SortOrder
    plan?: SortOrderInput | SortOrder
    riskLevel?: SortOrder
    followUpDate?: SortOrderInput | SortOrder
    nextSessionRecommendation?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    psychologistProfile?: PsychologistProfileOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    schedule?: ScheduleOrderByWithRelationInput
  }

  export type SessionNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    scheduleId?: string
    AND?: SessionNoteWhereInput | SessionNoteWhereInput[]
    OR?: SessionNoteWhereInput[]
    NOT?: SessionNoteWhereInput | SessionNoteWhereInput[]
    psychologistProfileId?: StringFilter<"SessionNote"> | string
    userId?: StringFilter<"SessionNote"> | string
    subjective?: StringNullableFilter<"SessionNote"> | string | null
    objective?: StringNullableFilter<"SessionNote"> | string | null
    assessment?: StringNullableFilter<"SessionNote"> | string | null
    plan?: StringNullableFilter<"SessionNote"> | string | null
    riskLevel?: EnumRiskLevelFilter<"SessionNote"> | $Enums.RiskLevel
    followUpDate?: DateTimeNullableFilter<"SessionNote"> | Date | string | null
    nextSessionRecommendation?: StringNullableFilter<"SessionNote"> | string | null
    tags?: StringNullableListFilter<"SessionNote">
    createdAt?: DateTimeFilter<"SessionNote"> | Date | string
    updatedAt?: DateTimeFilter<"SessionNote"> | Date | string
    deletedAt?: DateTimeNullableFilter<"SessionNote"> | Date | string | null
    psychologistProfile?: XOR<PsychologistProfileScalarRelationFilter, PsychologistProfileWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    schedule?: XOR<ScheduleNullableScalarRelationFilter, ScheduleWhereInput> | null
  }, "id" | "scheduleId">

  export type SessionNoteOrderByWithAggregationInput = {
    id?: SortOrder
    psychologistProfileId?: SortOrder
    userId?: SortOrder
    scheduleId?: SortOrderInput | SortOrder
    subjective?: SortOrderInput | SortOrder
    objective?: SortOrderInput | SortOrder
    assessment?: SortOrderInput | SortOrder
    plan?: SortOrderInput | SortOrder
    riskLevel?: SortOrder
    followUpDate?: SortOrderInput | SortOrder
    nextSessionRecommendation?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: SessionNoteCountOrderByAggregateInput
    _max?: SessionNoteMaxOrderByAggregateInput
    _min?: SessionNoteMinOrderByAggregateInput
  }

  export type SessionNoteScalarWhereWithAggregatesInput = {
    AND?: SessionNoteScalarWhereWithAggregatesInput | SessionNoteScalarWhereWithAggregatesInput[]
    OR?: SessionNoteScalarWhereWithAggregatesInput[]
    NOT?: SessionNoteScalarWhereWithAggregatesInput | SessionNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SessionNote"> | string
    psychologistProfileId?: StringWithAggregatesFilter<"SessionNote"> | string
    userId?: StringWithAggregatesFilter<"SessionNote"> | string
    scheduleId?: StringNullableWithAggregatesFilter<"SessionNote"> | string | null
    subjective?: StringNullableWithAggregatesFilter<"SessionNote"> | string | null
    objective?: StringNullableWithAggregatesFilter<"SessionNote"> | string | null
    assessment?: StringNullableWithAggregatesFilter<"SessionNote"> | string | null
    plan?: StringNullableWithAggregatesFilter<"SessionNote"> | string | null
    riskLevel?: EnumRiskLevelWithAggregatesFilter<"SessionNote"> | $Enums.RiskLevel
    followUpDate?: DateTimeNullableWithAggregatesFilter<"SessionNote"> | Date | string | null
    nextSessionRecommendation?: StringNullableWithAggregatesFilter<"SessionNote"> | string | null
    tags?: StringNullableListFilter<"SessionNote">
    createdAt?: DateTimeWithAggregatesFilter<"SessionNote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SessionNote"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"SessionNote"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authProvider?: AuthProviderCreateNestedOneWithoutUserInput
    passwordResets?: PasswordResetCreateNestedManyWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    psychologistProfile?: PsychologistProfileCreateNestedOneWithoutUserInput
    emailVerifications?: EmailVerificationCreateNestedManyWithoutUserInput
    sessionNotes?: SessionNoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authProvider?: AuthProviderUncheckedCreateNestedOneWithoutUserInput
    passwordResets?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    psychologistProfile?: PsychologistProfileUncheckedCreateNestedOneWithoutUserInput
    emailVerifications?: EmailVerificationUncheckedCreateNestedManyWithoutUserInput
    sessionNotes?: SessionNoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProvider?: AuthProviderUpdateOneWithoutUserNestedInput
    passwordResets?: PasswordResetUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    psychologistProfile?: PsychologistProfileUpdateOneWithoutUserNestedInput
    emailVerifications?: EmailVerificationUpdateManyWithoutUserNestedInput
    sessionNotes?: SessionNoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProvider?: AuthProviderUncheckedUpdateOneWithoutUserNestedInput
    passwordResets?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    psychologistProfile?: PsychologistProfileUncheckedUpdateOneWithoutUserNestedInput
    emailVerifications?: EmailVerificationUncheckedUpdateManyWithoutUserNestedInput
    sessionNotes?: SessionNoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthProviderCreateInput = {
    id?: string
    provider: string
    providerId?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAuthProviderInput
  }

  export type AuthProviderUncheckedCreateInput = {
    id?: string
    userId: string
    provider: string
    providerId?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthProviderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuthProviderNestedInput
  }

  export type AuthProviderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthProviderCreateManyInput = {
    id?: string
    userId: string
    provider: string
    providerId?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthProviderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthProviderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPasswordResetsInput
  }

  export type PasswordResetUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PasswordResetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPasswordResetsNestedInput
  }

  export type PasswordResetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetCreateManyInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PasswordResetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileCreateInput = {
    id?: string
    fullName?: string | null
    birthday?: Date | string | null
    gender?: $Enums.Gender | null
    country?: string | null
    city?: string | null
    fullAddress?: string | null
    phone?: string | null
    user: UserCreateNestedOneWithoutUserProfileInput
  }

  export type UserProfileUncheckedCreateInput = {
    id?: string
    userId: string
    fullName?: string | null
    birthday?: Date | string | null
    gender?: $Enums.Gender | null
    country?: string | null
    city?: string | null
    fullAddress?: string | null
    phone?: string | null
  }

  export type UserProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    fullAddress?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutUserProfileNestedInput
  }

  export type UserProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    fullAddress?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserProfileCreateManyInput = {
    id?: string
    userId: string
    fullName?: string | null
    birthday?: Date | string | null
    gender?: $Enums.Gender | null
    country?: string | null
    city?: string | null
    fullAddress?: string | null
    phone?: string | null
  }

  export type UserProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    fullAddress?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    fullAddress?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PsychologistProfileCreateInput = {
    id?: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPsychologistProfileInput
    educations?: EducationCreateNestedManyWithoutPsychologistInput
    experiences?: ExperienceCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileUncheckedCreateInput = {
    id?: string
    userId: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    educations?: EducationUncheckedCreateNestedManyWithoutPsychologistInput
    experiences?: ExperienceUncheckedCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationUncheckedCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseUncheckedCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteUncheckedCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPsychologistProfileNestedInput
    educations?: EducationUpdateManyWithoutPsychologistNestedInput
    experiences?: ExperienceUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type PsychologistProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    educations?: EducationUncheckedUpdateManyWithoutPsychologistNestedInput
    experiences?: ExperienceUncheckedUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUncheckedUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUncheckedUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUncheckedUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type PsychologistProfileCreateManyInput = {
    id?: string
    userId: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PsychologistProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PsychologistProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationCreateInput = {
    id?: string
    degree: string
    institution: string
    city: string
    startYear: number
    endYear: number
    createdAt?: Date | string
    psychologist: PsychologistProfileCreateNestedOneWithoutEducationsInput
  }

  export type EducationUncheckedCreateInput = {
    id?: string
    psychologistId: string
    degree: string
    institution: string
    city: string
    startYear: number
    endYear: number
    createdAt?: Date | string
  }

  export type EducationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistProfileUpdateOneRequiredWithoutEducationsNestedInput
  }

  export type EducationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistId?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationCreateManyInput = {
    id?: string
    psychologistId: string
    degree: string
    institution: string
    city: string
    startYear: number
    endYear: number
    createdAt?: Date | string
  }

  export type EducationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistId?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperienceCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    psychologist: PsychologistProfileCreateNestedOneWithoutExperiencesInput
  }

  export type ExperienceUncheckedCreateInput = {
    id?: string
    psychologistId: string
    name: string
    createdAt?: Date | string
  }

  export type ExperienceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistProfileUpdateOneRequiredWithoutExperiencesNestedInput
  }

  export type ExperienceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperienceCreateManyInput = {
    id?: string
    psychologistId: string
    name: string
    createdAt?: Date | string
  }

  export type ExperienceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperienceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpecializationCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    psychologist: PsychologistProfileCreateNestedOneWithoutSpecializationsInput
  }

  export type SpecializationUncheckedCreateInput = {
    id?: string
    psychologistId: string
    name: string
    createdAt?: Date | string
  }

  export type SpecializationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistProfileUpdateOneRequiredWithoutSpecializationsNestedInput
  }

  export type SpecializationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpecializationCreateManyInput = {
    id?: string
    psychologistId: string
    name: string
    createdAt?: Date | string
  }

  export type SpecializationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpecializationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpertiseCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    psychologist: PsychologistProfileCreateNestedOneWithoutExpertisesInput
  }

  export type ExpertiseUncheckedCreateInput = {
    id?: string
    psychologistId: string
    name: string
    createdAt?: Date | string
  }

  export type ExpertiseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistProfileUpdateOneRequiredWithoutExpertisesNestedInput
  }

  export type ExpertiseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpertiseCreateManyInput = {
    id?: string
    psychologistId: string
    name: string
    createdAt?: Date | string
  }

  export type ExpertiseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpertiseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateInput = {
    id?: string
    date: Date | string
    startTime: string
    duration: number
    isAvailable?: boolean
    createdAt?: Date | string
    psychologist: PsychologistProfileCreateNestedOneWithoutSchedulesInput
    sessionNote?: SessionNoteCreateNestedOneWithoutScheduleInput
  }

  export type ScheduleUncheckedCreateInput = {
    id?: string
    psychologistId: string
    date: Date | string
    startTime: string
    duration: number
    isAvailable?: boolean
    createdAt?: Date | string
    sessionNote?: SessionNoteUncheckedCreateNestedOneWithoutScheduleInput
  }

  export type ScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistProfileUpdateOneRequiredWithoutSchedulesNestedInput
    sessionNote?: SessionNoteUpdateOneWithoutScheduleNestedInput
  }

  export type ScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionNote?: SessionNoteUncheckedUpdateOneWithoutScheduleNestedInput
  }

  export type ScheduleCreateManyInput = {
    id?: string
    psychologistId: string
    date: Date | string
    startTime: string
    duration: number
    isAvailable?: boolean
    createdAt?: Date | string
  }

  export type ScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutEmailVerificationsInput
  }

  export type EmailVerificationUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type EmailVerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmailVerificationsNestedInput
  }

  export type EmailVerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationCreateManyInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type EmailVerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionNoteCreateInput = {
    id?: string
    subjective?: string | null
    objective?: string | null
    assessment?: string | null
    plan?: string | null
    riskLevel?: $Enums.RiskLevel
    followUpDate?: Date | string | null
    nextSessionRecommendation?: string | null
    tags?: SessionNoteCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    psychologistProfile: PsychologistProfileCreateNestedOneWithoutSessionNotesInput
    user: UserCreateNestedOneWithoutSessionNotesInput
    schedule?: ScheduleCreateNestedOneWithoutSessionNoteInput
  }

  export type SessionNoteUncheckedCreateInput = {
    id?: string
    psychologistProfileId: string
    userId: string
    scheduleId?: string | null
    subjective?: string | null
    objective?: string | null
    assessment?: string | null
    plan?: string | null
    riskLevel?: $Enums.RiskLevel
    followUpDate?: Date | string | null
    nextSessionRecommendation?: string | null
    tags?: SessionNoteCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type SessionNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjective?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextSessionRecommendation?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SessionNoteUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    psychologistProfile?: PsychologistProfileUpdateOneRequiredWithoutSessionNotesNestedInput
    user?: UserUpdateOneRequiredWithoutSessionNotesNestedInput
    schedule?: ScheduleUpdateOneWithoutSessionNoteNestedInput
  }

  export type SessionNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistProfileId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scheduleId?: NullableStringFieldUpdateOperationsInput | string | null
    subjective?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextSessionRecommendation?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SessionNoteUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionNoteCreateManyInput = {
    id?: string
    psychologistProfileId: string
    userId: string
    scheduleId?: string | null
    subjective?: string | null
    objective?: string | null
    assessment?: string | null
    plan?: string | null
    riskLevel?: $Enums.RiskLevel
    followUpDate?: Date | string | null
    nextSessionRecommendation?: string | null
    tags?: SessionNoteCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type SessionNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjective?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextSessionRecommendation?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SessionNoteUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistProfileId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scheduleId?: NullableStringFieldUpdateOperationsInput | string | null
    subjective?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextSessionRecommendation?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SessionNoteUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AuthProviderNullableScalarRelationFilter = {
    is?: AuthProviderWhereInput | null
    isNot?: AuthProviderWhereInput | null
  }

  export type PasswordResetListRelationFilter = {
    every?: PasswordResetWhereInput
    some?: PasswordResetWhereInput
    none?: PasswordResetWhereInput
  }

  export type UserProfileNullableScalarRelationFilter = {
    is?: UserProfileWhereInput | null
    isNot?: UserProfileWhereInput | null
  }

  export type PsychologistProfileNullableScalarRelationFilter = {
    is?: PsychologistProfileWhereInput | null
    isNot?: PsychologistProfileWhereInput | null
  }

  export type EmailVerificationListRelationFilter = {
    every?: EmailVerificationWhereInput
    some?: EmailVerificationWhereInput
    none?: EmailVerificationWhereInput
  }

  export type SessionNoteListRelationFilter = {
    every?: SessionNoteWhereInput
    some?: SessionNoteWhereInput
    none?: SessionNoteWhereInput
  }

  export type PasswordResetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailVerificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    isProfileComplete?: SortOrder
    isFirstLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    isProfileComplete?: SortOrder
    isFirstLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    isProfileComplete?: SortOrder
    isFirstLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuthProviderProviderProviderIdCompoundUniqueInput = {
    provider: string
    providerId: string
  }

  export type AuthProviderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthProviderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthProviderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PasswordResetCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type UserProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    birthday?: SortOrder
    gender?: SortOrder
    country?: SortOrder
    city?: SortOrder
    fullAddress?: SortOrder
    phone?: SortOrder
  }

  export type UserProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    birthday?: SortOrder
    gender?: SortOrder
    country?: SortOrder
    city?: SortOrder
    fullAddress?: SortOrder
    phone?: SortOrder
  }

  export type UserProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    birthday?: SortOrder
    gender?: SortOrder
    country?: SortOrder
    city?: SortOrder
    fullAddress?: SortOrder
    phone?: SortOrder
  }

  export type EnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type EducationListRelationFilter = {
    every?: EducationWhereInput
    some?: EducationWhereInput
    none?: EducationWhereInput
  }

  export type ExperienceListRelationFilter = {
    every?: ExperienceWhereInput
    some?: ExperienceWhereInput
    none?: ExperienceWhereInput
  }

  export type SpecializationListRelationFilter = {
    every?: SpecializationWhereInput
    some?: SpecializationWhereInput
    none?: SpecializationWhereInput
  }

  export type ExpertiseListRelationFilter = {
    every?: ExpertiseWhereInput
    some?: ExpertiseWhereInput
    none?: ExpertiseWhereInput
  }

  export type ScheduleListRelationFilter = {
    every?: ScheduleWhereInput
    some?: ScheduleWhereInput
    none?: ScheduleWhereInput
  }

  export type EducationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExperienceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SpecializationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExpertiseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PsychologistProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    sipp?: SortOrder
    str?: SortOrder
    about?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PsychologistProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    sipp?: SortOrder
    str?: SortOrder
    about?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PsychologistProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    sipp?: SortOrder
    str?: SortOrder
    about?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PsychologistProfileScalarRelationFilter = {
    is?: PsychologistProfileWhereInput
    isNot?: PsychologistProfileWhereInput
  }

  export type EducationCountOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    city?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    createdAt?: SortOrder
  }

  export type EducationAvgOrderByAggregateInput = {
    startYear?: SortOrder
    endYear?: SortOrder
  }

  export type EducationMaxOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    city?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    createdAt?: SortOrder
  }

  export type EducationMinOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    city?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    createdAt?: SortOrder
  }

  export type EducationSumOrderByAggregateInput = {
    startYear?: SortOrder
    endYear?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ExperienceCountOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ExperienceMaxOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ExperienceMinOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type SpecializationCountOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type SpecializationMaxOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type SpecializationMinOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ExpertiseCountOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ExpertiseMaxOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ExpertiseMinOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionNoteNullableScalarRelationFilter = {
    is?: SessionNoteWhereInput | null
    isNot?: SessionNoteWhereInput | null
  }

  export type ScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
  }

  export type ScheduleAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type ScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
  }

  export type ScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
  }

  export type ScheduleSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type EmailVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumRiskLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel>
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskLevelFilter<$PrismaModel> | $Enums.RiskLevel
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ScheduleNullableScalarRelationFilter = {
    is?: ScheduleWhereInput | null
    isNot?: ScheduleWhereInput | null
  }

  export type SessionNoteCountOrderByAggregateInput = {
    id?: SortOrder
    psychologistProfileId?: SortOrder
    userId?: SortOrder
    scheduleId?: SortOrder
    subjective?: SortOrder
    objective?: SortOrder
    assessment?: SortOrder
    plan?: SortOrder
    riskLevel?: SortOrder
    followUpDate?: SortOrder
    nextSessionRecommendation?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type SessionNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    psychologistProfileId?: SortOrder
    userId?: SortOrder
    scheduleId?: SortOrder
    subjective?: SortOrder
    objective?: SortOrder
    assessment?: SortOrder
    plan?: SortOrder
    riskLevel?: SortOrder
    followUpDate?: SortOrder
    nextSessionRecommendation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type SessionNoteMinOrderByAggregateInput = {
    id?: SortOrder
    psychologistProfileId?: SortOrder
    userId?: SortOrder
    scheduleId?: SortOrder
    subjective?: SortOrder
    objective?: SortOrder
    assessment?: SortOrder
    plan?: SortOrder
    riskLevel?: SortOrder
    followUpDate?: SortOrder
    nextSessionRecommendation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type EnumRiskLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel>
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskLevelWithAggregatesFilter<$PrismaModel> | $Enums.RiskLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRiskLevelFilter<$PrismaModel>
    _max?: NestedEnumRiskLevelFilter<$PrismaModel>
  }

  export type AuthProviderCreateNestedOneWithoutUserInput = {
    create?: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>
    connectOrCreate?: AuthProviderCreateOrConnectWithoutUserInput
    connect?: AuthProviderWhereUniqueInput
  }

  export type PasswordResetCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
  }

  export type UserProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    connect?: UserProfileWhereUniqueInput
  }

  export type PsychologistProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<PsychologistProfileCreateWithoutUserInput, PsychologistProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutUserInput
    connect?: PsychologistProfileWhereUniqueInput
  }

  export type EmailVerificationCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailVerificationCreateWithoutUserInput, EmailVerificationUncheckedCreateWithoutUserInput> | EmailVerificationCreateWithoutUserInput[] | EmailVerificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailVerificationCreateOrConnectWithoutUserInput | EmailVerificationCreateOrConnectWithoutUserInput[]
    createMany?: EmailVerificationCreateManyUserInputEnvelope
    connect?: EmailVerificationWhereUniqueInput | EmailVerificationWhereUniqueInput[]
  }

  export type SessionNoteCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionNoteCreateWithoutUserInput, SessionNoteUncheckedCreateWithoutUserInput> | SessionNoteCreateWithoutUserInput[] | SessionNoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutUserInput | SessionNoteCreateOrConnectWithoutUserInput[]
    createMany?: SessionNoteCreateManyUserInputEnvelope
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
  }

  export type AuthProviderUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>
    connectOrCreate?: AuthProviderCreateOrConnectWithoutUserInput
    connect?: AuthProviderWhereUniqueInput
  }

  export type PasswordResetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
  }

  export type UserProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    connect?: UserProfileWhereUniqueInput
  }

  export type PsychologistProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PsychologistProfileCreateWithoutUserInput, PsychologistProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutUserInput
    connect?: PsychologistProfileWhereUniqueInput
  }

  export type EmailVerificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailVerificationCreateWithoutUserInput, EmailVerificationUncheckedCreateWithoutUserInput> | EmailVerificationCreateWithoutUserInput[] | EmailVerificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailVerificationCreateOrConnectWithoutUserInput | EmailVerificationCreateOrConnectWithoutUserInput[]
    createMany?: EmailVerificationCreateManyUserInputEnvelope
    connect?: EmailVerificationWhereUniqueInput | EmailVerificationWhereUniqueInput[]
  }

  export type SessionNoteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionNoteCreateWithoutUserInput, SessionNoteUncheckedCreateWithoutUserInput> | SessionNoteCreateWithoutUserInput[] | SessionNoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutUserInput | SessionNoteCreateOrConnectWithoutUserInput[]
    createMany?: SessionNoteCreateManyUserInputEnvelope
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AuthProviderUpdateOneWithoutUserNestedInput = {
    create?: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>
    connectOrCreate?: AuthProviderCreateOrConnectWithoutUserInput
    upsert?: AuthProviderUpsertWithoutUserInput
    disconnect?: AuthProviderWhereInput | boolean
    delete?: AuthProviderWhereInput | boolean
    connect?: AuthProviderWhereUniqueInput
    update?: XOR<XOR<AuthProviderUpdateToOneWithWhereWithoutUserInput, AuthProviderUpdateWithoutUserInput>, AuthProviderUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetUpsertWithWhereUniqueWithoutUserInput | PasswordResetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    set?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    disconnect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    delete?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    update?: PasswordResetUpdateWithWhereUniqueWithoutUserInput | PasswordResetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetUpdateManyWithWhereWithoutUserInput | PasswordResetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
  }

  export type UserProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    upsert?: UserProfileUpsertWithoutUserInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutUserInput, UserProfileUpdateWithoutUserInput>, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type PsychologistProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<PsychologistProfileCreateWithoutUserInput, PsychologistProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutUserInput
    upsert?: PsychologistProfileUpsertWithoutUserInput
    disconnect?: PsychologistProfileWhereInput | boolean
    delete?: PsychologistProfileWhereInput | boolean
    connect?: PsychologistProfileWhereUniqueInput
    update?: XOR<XOR<PsychologistProfileUpdateToOneWithWhereWithoutUserInput, PsychologistProfileUpdateWithoutUserInput>, PsychologistProfileUncheckedUpdateWithoutUserInput>
  }

  export type EmailVerificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailVerificationCreateWithoutUserInput, EmailVerificationUncheckedCreateWithoutUserInput> | EmailVerificationCreateWithoutUserInput[] | EmailVerificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailVerificationCreateOrConnectWithoutUserInput | EmailVerificationCreateOrConnectWithoutUserInput[]
    upsert?: EmailVerificationUpsertWithWhereUniqueWithoutUserInput | EmailVerificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailVerificationCreateManyUserInputEnvelope
    set?: EmailVerificationWhereUniqueInput | EmailVerificationWhereUniqueInput[]
    disconnect?: EmailVerificationWhereUniqueInput | EmailVerificationWhereUniqueInput[]
    delete?: EmailVerificationWhereUniqueInput | EmailVerificationWhereUniqueInput[]
    connect?: EmailVerificationWhereUniqueInput | EmailVerificationWhereUniqueInput[]
    update?: EmailVerificationUpdateWithWhereUniqueWithoutUserInput | EmailVerificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailVerificationUpdateManyWithWhereWithoutUserInput | EmailVerificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailVerificationScalarWhereInput | EmailVerificationScalarWhereInput[]
  }

  export type SessionNoteUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionNoteCreateWithoutUserInput, SessionNoteUncheckedCreateWithoutUserInput> | SessionNoteCreateWithoutUserInput[] | SessionNoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutUserInput | SessionNoteCreateOrConnectWithoutUserInput[]
    upsert?: SessionNoteUpsertWithWhereUniqueWithoutUserInput | SessionNoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionNoteCreateManyUserInputEnvelope
    set?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    disconnect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    delete?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    update?: SessionNoteUpdateWithWhereUniqueWithoutUserInput | SessionNoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionNoteUpdateManyWithWhereWithoutUserInput | SessionNoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionNoteScalarWhereInput | SessionNoteScalarWhereInput[]
  }

  export type AuthProviderUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>
    connectOrCreate?: AuthProviderCreateOrConnectWithoutUserInput
    upsert?: AuthProviderUpsertWithoutUserInput
    disconnect?: AuthProviderWhereInput | boolean
    delete?: AuthProviderWhereInput | boolean
    connect?: AuthProviderWhereUniqueInput
    update?: XOR<XOR<AuthProviderUpdateToOneWithWhereWithoutUserInput, AuthProviderUpdateWithoutUserInput>, AuthProviderUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetUpsertWithWhereUniqueWithoutUserInput | PasswordResetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    set?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    disconnect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    delete?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    update?: PasswordResetUpdateWithWhereUniqueWithoutUserInput | PasswordResetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetUpdateManyWithWhereWithoutUserInput | PasswordResetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
  }

  export type UserProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    upsert?: UserProfileUpsertWithoutUserInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutUserInput, UserProfileUpdateWithoutUserInput>, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type PsychologistProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PsychologistProfileCreateWithoutUserInput, PsychologistProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutUserInput
    upsert?: PsychologistProfileUpsertWithoutUserInput
    disconnect?: PsychologistProfileWhereInput | boolean
    delete?: PsychologistProfileWhereInput | boolean
    connect?: PsychologistProfileWhereUniqueInput
    update?: XOR<XOR<PsychologistProfileUpdateToOneWithWhereWithoutUserInput, PsychologistProfileUpdateWithoutUserInput>, PsychologistProfileUncheckedUpdateWithoutUserInput>
  }

  export type EmailVerificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailVerificationCreateWithoutUserInput, EmailVerificationUncheckedCreateWithoutUserInput> | EmailVerificationCreateWithoutUserInput[] | EmailVerificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailVerificationCreateOrConnectWithoutUserInput | EmailVerificationCreateOrConnectWithoutUserInput[]
    upsert?: EmailVerificationUpsertWithWhereUniqueWithoutUserInput | EmailVerificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailVerificationCreateManyUserInputEnvelope
    set?: EmailVerificationWhereUniqueInput | EmailVerificationWhereUniqueInput[]
    disconnect?: EmailVerificationWhereUniqueInput | EmailVerificationWhereUniqueInput[]
    delete?: EmailVerificationWhereUniqueInput | EmailVerificationWhereUniqueInput[]
    connect?: EmailVerificationWhereUniqueInput | EmailVerificationWhereUniqueInput[]
    update?: EmailVerificationUpdateWithWhereUniqueWithoutUserInput | EmailVerificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailVerificationUpdateManyWithWhereWithoutUserInput | EmailVerificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailVerificationScalarWhereInput | EmailVerificationScalarWhereInput[]
  }

  export type SessionNoteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionNoteCreateWithoutUserInput, SessionNoteUncheckedCreateWithoutUserInput> | SessionNoteCreateWithoutUserInput[] | SessionNoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutUserInput | SessionNoteCreateOrConnectWithoutUserInput[]
    upsert?: SessionNoteUpsertWithWhereUniqueWithoutUserInput | SessionNoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionNoteCreateManyUserInputEnvelope
    set?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    disconnect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    delete?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    update?: SessionNoteUpdateWithWhereUniqueWithoutUserInput | SessionNoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionNoteUpdateManyWithWhereWithoutUserInput | SessionNoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionNoteScalarWhereInput | SessionNoteScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAuthProviderInput = {
    create?: XOR<UserCreateWithoutAuthProviderInput, UserUncheckedCreateWithoutAuthProviderInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthProviderInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutAuthProviderNestedInput = {
    create?: XOR<UserCreateWithoutAuthProviderInput, UserUncheckedCreateWithoutAuthProviderInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthProviderInput
    upsert?: UserUpsertWithoutAuthProviderInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthProviderInput, UserUpdateWithoutAuthProviderInput>, UserUncheckedUpdateWithoutAuthProviderInput>
  }

  export type UserCreateNestedOneWithoutPasswordResetsInput = {
    create?: XOR<UserCreateWithoutPasswordResetsInput, UserUncheckedCreateWithoutPasswordResetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutPasswordResetsNestedInput = {
    create?: XOR<UserCreateWithoutPasswordResetsInput, UserUncheckedCreateWithoutPasswordResetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetsInput
    upsert?: UserUpsertWithoutPasswordResetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordResetsInput, UserUpdateWithoutPasswordResetsInput>, UserUncheckedUpdateWithoutPasswordResetsInput>
  }

  export type UserCreateNestedOneWithoutUserProfileInput = {
    create?: XOR<UserCreateWithoutUserProfileInput, UserUncheckedCreateWithoutUserProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserProfileInput
    connect?: UserWhereUniqueInput
  }

  export type NullableEnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender | null
  }

  export type UserUpdateOneRequiredWithoutUserProfileNestedInput = {
    create?: XOR<UserCreateWithoutUserProfileInput, UserUncheckedCreateWithoutUserProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserProfileInput
    upsert?: UserUpsertWithoutUserProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserProfileInput, UserUpdateWithoutUserProfileInput>, UserUncheckedUpdateWithoutUserProfileInput>
  }

  export type UserCreateNestedOneWithoutPsychologistProfileInput = {
    create?: XOR<UserCreateWithoutPsychologistProfileInput, UserUncheckedCreateWithoutPsychologistProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutPsychologistProfileInput
    connect?: UserWhereUniqueInput
  }

  export type EducationCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<EducationCreateWithoutPsychologistInput, EducationUncheckedCreateWithoutPsychologistInput> | EducationCreateWithoutPsychologistInput[] | EducationUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: EducationCreateOrConnectWithoutPsychologistInput | EducationCreateOrConnectWithoutPsychologistInput[]
    createMany?: EducationCreateManyPsychologistInputEnvelope
    connect?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
  }

  export type ExperienceCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<ExperienceCreateWithoutPsychologistInput, ExperienceUncheckedCreateWithoutPsychologistInput> | ExperienceCreateWithoutPsychologistInput[] | ExperienceUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: ExperienceCreateOrConnectWithoutPsychologistInput | ExperienceCreateOrConnectWithoutPsychologistInput[]
    createMany?: ExperienceCreateManyPsychologistInputEnvelope
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
  }

  export type SpecializationCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<SpecializationCreateWithoutPsychologistInput, SpecializationUncheckedCreateWithoutPsychologistInput> | SpecializationCreateWithoutPsychologistInput[] | SpecializationUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: SpecializationCreateOrConnectWithoutPsychologistInput | SpecializationCreateOrConnectWithoutPsychologistInput[]
    createMany?: SpecializationCreateManyPsychologistInputEnvelope
    connect?: SpecializationWhereUniqueInput | SpecializationWhereUniqueInput[]
  }

  export type ExpertiseCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<ExpertiseCreateWithoutPsychologistInput, ExpertiseUncheckedCreateWithoutPsychologistInput> | ExpertiseCreateWithoutPsychologistInput[] | ExpertiseUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: ExpertiseCreateOrConnectWithoutPsychologistInput | ExpertiseCreateOrConnectWithoutPsychologistInput[]
    createMany?: ExpertiseCreateManyPsychologistInputEnvelope
    connect?: ExpertiseWhereUniqueInput | ExpertiseWhereUniqueInput[]
  }

  export type ScheduleCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<ScheduleCreateWithoutPsychologistInput, ScheduleUncheckedCreateWithoutPsychologistInput> | ScheduleCreateWithoutPsychologistInput[] | ScheduleUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutPsychologistInput | ScheduleCreateOrConnectWithoutPsychologistInput[]
    createMany?: ScheduleCreateManyPsychologistInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type SessionNoteCreateNestedManyWithoutPsychologistProfileInput = {
    create?: XOR<SessionNoteCreateWithoutPsychologistProfileInput, SessionNoteUncheckedCreateWithoutPsychologistProfileInput> | SessionNoteCreateWithoutPsychologistProfileInput[] | SessionNoteUncheckedCreateWithoutPsychologistProfileInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutPsychologistProfileInput | SessionNoteCreateOrConnectWithoutPsychologistProfileInput[]
    createMany?: SessionNoteCreateManyPsychologistProfileInputEnvelope
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
  }

  export type EducationUncheckedCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<EducationCreateWithoutPsychologistInput, EducationUncheckedCreateWithoutPsychologistInput> | EducationCreateWithoutPsychologistInput[] | EducationUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: EducationCreateOrConnectWithoutPsychologistInput | EducationCreateOrConnectWithoutPsychologistInput[]
    createMany?: EducationCreateManyPsychologistInputEnvelope
    connect?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
  }

  export type ExperienceUncheckedCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<ExperienceCreateWithoutPsychologistInput, ExperienceUncheckedCreateWithoutPsychologistInput> | ExperienceCreateWithoutPsychologistInput[] | ExperienceUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: ExperienceCreateOrConnectWithoutPsychologistInput | ExperienceCreateOrConnectWithoutPsychologistInput[]
    createMany?: ExperienceCreateManyPsychologistInputEnvelope
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
  }

  export type SpecializationUncheckedCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<SpecializationCreateWithoutPsychologistInput, SpecializationUncheckedCreateWithoutPsychologistInput> | SpecializationCreateWithoutPsychologistInput[] | SpecializationUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: SpecializationCreateOrConnectWithoutPsychologistInput | SpecializationCreateOrConnectWithoutPsychologistInput[]
    createMany?: SpecializationCreateManyPsychologistInputEnvelope
    connect?: SpecializationWhereUniqueInput | SpecializationWhereUniqueInput[]
  }

  export type ExpertiseUncheckedCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<ExpertiseCreateWithoutPsychologistInput, ExpertiseUncheckedCreateWithoutPsychologistInput> | ExpertiseCreateWithoutPsychologistInput[] | ExpertiseUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: ExpertiseCreateOrConnectWithoutPsychologistInput | ExpertiseCreateOrConnectWithoutPsychologistInput[]
    createMany?: ExpertiseCreateManyPsychologistInputEnvelope
    connect?: ExpertiseWhereUniqueInput | ExpertiseWhereUniqueInput[]
  }

  export type ScheduleUncheckedCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<ScheduleCreateWithoutPsychologistInput, ScheduleUncheckedCreateWithoutPsychologistInput> | ScheduleCreateWithoutPsychologistInput[] | ScheduleUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutPsychologistInput | ScheduleCreateOrConnectWithoutPsychologistInput[]
    createMany?: ScheduleCreateManyPsychologistInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type SessionNoteUncheckedCreateNestedManyWithoutPsychologistProfileInput = {
    create?: XOR<SessionNoteCreateWithoutPsychologistProfileInput, SessionNoteUncheckedCreateWithoutPsychologistProfileInput> | SessionNoteCreateWithoutPsychologistProfileInput[] | SessionNoteUncheckedCreateWithoutPsychologistProfileInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutPsychologistProfileInput | SessionNoteCreateOrConnectWithoutPsychologistProfileInput[]
    createMany?: SessionNoteCreateManyPsychologistProfileInputEnvelope
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPsychologistProfileNestedInput = {
    create?: XOR<UserCreateWithoutPsychologistProfileInput, UserUncheckedCreateWithoutPsychologistProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutPsychologistProfileInput
    upsert?: UserUpsertWithoutPsychologistProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPsychologistProfileInput, UserUpdateWithoutPsychologistProfileInput>, UserUncheckedUpdateWithoutPsychologistProfileInput>
  }

  export type EducationUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<EducationCreateWithoutPsychologistInput, EducationUncheckedCreateWithoutPsychologistInput> | EducationCreateWithoutPsychologistInput[] | EducationUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: EducationCreateOrConnectWithoutPsychologistInput | EducationCreateOrConnectWithoutPsychologistInput[]
    upsert?: EducationUpsertWithWhereUniqueWithoutPsychologistInput | EducationUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: EducationCreateManyPsychologistInputEnvelope
    set?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    disconnect?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    delete?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    connect?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    update?: EducationUpdateWithWhereUniqueWithoutPsychologistInput | EducationUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: EducationUpdateManyWithWhereWithoutPsychologistInput | EducationUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: EducationScalarWhereInput | EducationScalarWhereInput[]
  }

  export type ExperienceUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<ExperienceCreateWithoutPsychologistInput, ExperienceUncheckedCreateWithoutPsychologistInput> | ExperienceCreateWithoutPsychologistInput[] | ExperienceUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: ExperienceCreateOrConnectWithoutPsychologistInput | ExperienceCreateOrConnectWithoutPsychologistInput[]
    upsert?: ExperienceUpsertWithWhereUniqueWithoutPsychologistInput | ExperienceUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: ExperienceCreateManyPsychologistInputEnvelope
    set?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    disconnect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    delete?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    update?: ExperienceUpdateWithWhereUniqueWithoutPsychologistInput | ExperienceUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: ExperienceUpdateManyWithWhereWithoutPsychologistInput | ExperienceUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[]
  }

  export type SpecializationUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<SpecializationCreateWithoutPsychologistInput, SpecializationUncheckedCreateWithoutPsychologistInput> | SpecializationCreateWithoutPsychologistInput[] | SpecializationUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: SpecializationCreateOrConnectWithoutPsychologistInput | SpecializationCreateOrConnectWithoutPsychologistInput[]
    upsert?: SpecializationUpsertWithWhereUniqueWithoutPsychologistInput | SpecializationUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: SpecializationCreateManyPsychologistInputEnvelope
    set?: SpecializationWhereUniqueInput | SpecializationWhereUniqueInput[]
    disconnect?: SpecializationWhereUniqueInput | SpecializationWhereUniqueInput[]
    delete?: SpecializationWhereUniqueInput | SpecializationWhereUniqueInput[]
    connect?: SpecializationWhereUniqueInput | SpecializationWhereUniqueInput[]
    update?: SpecializationUpdateWithWhereUniqueWithoutPsychologistInput | SpecializationUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: SpecializationUpdateManyWithWhereWithoutPsychologistInput | SpecializationUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: SpecializationScalarWhereInput | SpecializationScalarWhereInput[]
  }

  export type ExpertiseUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<ExpertiseCreateWithoutPsychologistInput, ExpertiseUncheckedCreateWithoutPsychologistInput> | ExpertiseCreateWithoutPsychologistInput[] | ExpertiseUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: ExpertiseCreateOrConnectWithoutPsychologistInput | ExpertiseCreateOrConnectWithoutPsychologistInput[]
    upsert?: ExpertiseUpsertWithWhereUniqueWithoutPsychologistInput | ExpertiseUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: ExpertiseCreateManyPsychologistInputEnvelope
    set?: ExpertiseWhereUniqueInput | ExpertiseWhereUniqueInput[]
    disconnect?: ExpertiseWhereUniqueInput | ExpertiseWhereUniqueInput[]
    delete?: ExpertiseWhereUniqueInput | ExpertiseWhereUniqueInput[]
    connect?: ExpertiseWhereUniqueInput | ExpertiseWhereUniqueInput[]
    update?: ExpertiseUpdateWithWhereUniqueWithoutPsychologistInput | ExpertiseUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: ExpertiseUpdateManyWithWhereWithoutPsychologistInput | ExpertiseUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: ExpertiseScalarWhereInput | ExpertiseScalarWhereInput[]
  }

  export type ScheduleUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<ScheduleCreateWithoutPsychologistInput, ScheduleUncheckedCreateWithoutPsychologistInput> | ScheduleCreateWithoutPsychologistInput[] | ScheduleUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutPsychologistInput | ScheduleCreateOrConnectWithoutPsychologistInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutPsychologistInput | ScheduleUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: ScheduleCreateManyPsychologistInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutPsychologistInput | ScheduleUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutPsychologistInput | ScheduleUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type SessionNoteUpdateManyWithoutPsychologistProfileNestedInput = {
    create?: XOR<SessionNoteCreateWithoutPsychologistProfileInput, SessionNoteUncheckedCreateWithoutPsychologistProfileInput> | SessionNoteCreateWithoutPsychologistProfileInput[] | SessionNoteUncheckedCreateWithoutPsychologistProfileInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutPsychologistProfileInput | SessionNoteCreateOrConnectWithoutPsychologistProfileInput[]
    upsert?: SessionNoteUpsertWithWhereUniqueWithoutPsychologistProfileInput | SessionNoteUpsertWithWhereUniqueWithoutPsychologistProfileInput[]
    createMany?: SessionNoteCreateManyPsychologistProfileInputEnvelope
    set?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    disconnect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    delete?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    update?: SessionNoteUpdateWithWhereUniqueWithoutPsychologistProfileInput | SessionNoteUpdateWithWhereUniqueWithoutPsychologistProfileInput[]
    updateMany?: SessionNoteUpdateManyWithWhereWithoutPsychologistProfileInput | SessionNoteUpdateManyWithWhereWithoutPsychologistProfileInput[]
    deleteMany?: SessionNoteScalarWhereInput | SessionNoteScalarWhereInput[]
  }

  export type EducationUncheckedUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<EducationCreateWithoutPsychologistInput, EducationUncheckedCreateWithoutPsychologistInput> | EducationCreateWithoutPsychologistInput[] | EducationUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: EducationCreateOrConnectWithoutPsychologistInput | EducationCreateOrConnectWithoutPsychologistInput[]
    upsert?: EducationUpsertWithWhereUniqueWithoutPsychologistInput | EducationUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: EducationCreateManyPsychologistInputEnvelope
    set?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    disconnect?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    delete?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    connect?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    update?: EducationUpdateWithWhereUniqueWithoutPsychologistInput | EducationUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: EducationUpdateManyWithWhereWithoutPsychologistInput | EducationUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: EducationScalarWhereInput | EducationScalarWhereInput[]
  }

  export type ExperienceUncheckedUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<ExperienceCreateWithoutPsychologistInput, ExperienceUncheckedCreateWithoutPsychologistInput> | ExperienceCreateWithoutPsychologistInput[] | ExperienceUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: ExperienceCreateOrConnectWithoutPsychologistInput | ExperienceCreateOrConnectWithoutPsychologistInput[]
    upsert?: ExperienceUpsertWithWhereUniqueWithoutPsychologistInput | ExperienceUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: ExperienceCreateManyPsychologistInputEnvelope
    set?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    disconnect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    delete?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    update?: ExperienceUpdateWithWhereUniqueWithoutPsychologistInput | ExperienceUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: ExperienceUpdateManyWithWhereWithoutPsychologistInput | ExperienceUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[]
  }

  export type SpecializationUncheckedUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<SpecializationCreateWithoutPsychologistInput, SpecializationUncheckedCreateWithoutPsychologistInput> | SpecializationCreateWithoutPsychologistInput[] | SpecializationUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: SpecializationCreateOrConnectWithoutPsychologistInput | SpecializationCreateOrConnectWithoutPsychologistInput[]
    upsert?: SpecializationUpsertWithWhereUniqueWithoutPsychologistInput | SpecializationUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: SpecializationCreateManyPsychologistInputEnvelope
    set?: SpecializationWhereUniqueInput | SpecializationWhereUniqueInput[]
    disconnect?: SpecializationWhereUniqueInput | SpecializationWhereUniqueInput[]
    delete?: SpecializationWhereUniqueInput | SpecializationWhereUniqueInput[]
    connect?: SpecializationWhereUniqueInput | SpecializationWhereUniqueInput[]
    update?: SpecializationUpdateWithWhereUniqueWithoutPsychologistInput | SpecializationUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: SpecializationUpdateManyWithWhereWithoutPsychologistInput | SpecializationUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: SpecializationScalarWhereInput | SpecializationScalarWhereInput[]
  }

  export type ExpertiseUncheckedUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<ExpertiseCreateWithoutPsychologistInput, ExpertiseUncheckedCreateWithoutPsychologistInput> | ExpertiseCreateWithoutPsychologistInput[] | ExpertiseUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: ExpertiseCreateOrConnectWithoutPsychologistInput | ExpertiseCreateOrConnectWithoutPsychologistInput[]
    upsert?: ExpertiseUpsertWithWhereUniqueWithoutPsychologistInput | ExpertiseUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: ExpertiseCreateManyPsychologistInputEnvelope
    set?: ExpertiseWhereUniqueInput | ExpertiseWhereUniqueInput[]
    disconnect?: ExpertiseWhereUniqueInput | ExpertiseWhereUniqueInput[]
    delete?: ExpertiseWhereUniqueInput | ExpertiseWhereUniqueInput[]
    connect?: ExpertiseWhereUniqueInput | ExpertiseWhereUniqueInput[]
    update?: ExpertiseUpdateWithWhereUniqueWithoutPsychologistInput | ExpertiseUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: ExpertiseUpdateManyWithWhereWithoutPsychologistInput | ExpertiseUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: ExpertiseScalarWhereInput | ExpertiseScalarWhereInput[]
  }

  export type ScheduleUncheckedUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<ScheduleCreateWithoutPsychologistInput, ScheduleUncheckedCreateWithoutPsychologistInput> | ScheduleCreateWithoutPsychologistInput[] | ScheduleUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutPsychologistInput | ScheduleCreateOrConnectWithoutPsychologistInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutPsychologistInput | ScheduleUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: ScheduleCreateManyPsychologistInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutPsychologistInput | ScheduleUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutPsychologistInput | ScheduleUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type SessionNoteUncheckedUpdateManyWithoutPsychologistProfileNestedInput = {
    create?: XOR<SessionNoteCreateWithoutPsychologistProfileInput, SessionNoteUncheckedCreateWithoutPsychologistProfileInput> | SessionNoteCreateWithoutPsychologistProfileInput[] | SessionNoteUncheckedCreateWithoutPsychologistProfileInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutPsychologistProfileInput | SessionNoteCreateOrConnectWithoutPsychologistProfileInput[]
    upsert?: SessionNoteUpsertWithWhereUniqueWithoutPsychologistProfileInput | SessionNoteUpsertWithWhereUniqueWithoutPsychologistProfileInput[]
    createMany?: SessionNoteCreateManyPsychologistProfileInputEnvelope
    set?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    disconnect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    delete?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    update?: SessionNoteUpdateWithWhereUniqueWithoutPsychologistProfileInput | SessionNoteUpdateWithWhereUniqueWithoutPsychologistProfileInput[]
    updateMany?: SessionNoteUpdateManyWithWhereWithoutPsychologistProfileInput | SessionNoteUpdateManyWithWhereWithoutPsychologistProfileInput[]
    deleteMany?: SessionNoteScalarWhereInput | SessionNoteScalarWhereInput[]
  }

  export type PsychologistProfileCreateNestedOneWithoutEducationsInput = {
    create?: XOR<PsychologistProfileCreateWithoutEducationsInput, PsychologistProfileUncheckedCreateWithoutEducationsInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutEducationsInput
    connect?: PsychologistProfileWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PsychologistProfileUpdateOneRequiredWithoutEducationsNestedInput = {
    create?: XOR<PsychologistProfileCreateWithoutEducationsInput, PsychologistProfileUncheckedCreateWithoutEducationsInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutEducationsInput
    upsert?: PsychologistProfileUpsertWithoutEducationsInput
    connect?: PsychologistProfileWhereUniqueInput
    update?: XOR<XOR<PsychologistProfileUpdateToOneWithWhereWithoutEducationsInput, PsychologistProfileUpdateWithoutEducationsInput>, PsychologistProfileUncheckedUpdateWithoutEducationsInput>
  }

  export type PsychologistProfileCreateNestedOneWithoutExperiencesInput = {
    create?: XOR<PsychologistProfileCreateWithoutExperiencesInput, PsychologistProfileUncheckedCreateWithoutExperiencesInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutExperiencesInput
    connect?: PsychologistProfileWhereUniqueInput
  }

  export type PsychologistProfileUpdateOneRequiredWithoutExperiencesNestedInput = {
    create?: XOR<PsychologistProfileCreateWithoutExperiencesInput, PsychologistProfileUncheckedCreateWithoutExperiencesInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutExperiencesInput
    upsert?: PsychologistProfileUpsertWithoutExperiencesInput
    connect?: PsychologistProfileWhereUniqueInput
    update?: XOR<XOR<PsychologistProfileUpdateToOneWithWhereWithoutExperiencesInput, PsychologistProfileUpdateWithoutExperiencesInput>, PsychologistProfileUncheckedUpdateWithoutExperiencesInput>
  }

  export type PsychologistProfileCreateNestedOneWithoutSpecializationsInput = {
    create?: XOR<PsychologistProfileCreateWithoutSpecializationsInput, PsychologistProfileUncheckedCreateWithoutSpecializationsInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutSpecializationsInput
    connect?: PsychologistProfileWhereUniqueInput
  }

  export type PsychologistProfileUpdateOneRequiredWithoutSpecializationsNestedInput = {
    create?: XOR<PsychologistProfileCreateWithoutSpecializationsInput, PsychologistProfileUncheckedCreateWithoutSpecializationsInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutSpecializationsInput
    upsert?: PsychologistProfileUpsertWithoutSpecializationsInput
    connect?: PsychologistProfileWhereUniqueInput
    update?: XOR<XOR<PsychologistProfileUpdateToOneWithWhereWithoutSpecializationsInput, PsychologistProfileUpdateWithoutSpecializationsInput>, PsychologistProfileUncheckedUpdateWithoutSpecializationsInput>
  }

  export type PsychologistProfileCreateNestedOneWithoutExpertisesInput = {
    create?: XOR<PsychologistProfileCreateWithoutExpertisesInput, PsychologistProfileUncheckedCreateWithoutExpertisesInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutExpertisesInput
    connect?: PsychologistProfileWhereUniqueInput
  }

  export type PsychologistProfileUpdateOneRequiredWithoutExpertisesNestedInput = {
    create?: XOR<PsychologistProfileCreateWithoutExpertisesInput, PsychologistProfileUncheckedCreateWithoutExpertisesInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutExpertisesInput
    upsert?: PsychologistProfileUpsertWithoutExpertisesInput
    connect?: PsychologistProfileWhereUniqueInput
    update?: XOR<XOR<PsychologistProfileUpdateToOneWithWhereWithoutExpertisesInput, PsychologistProfileUpdateWithoutExpertisesInput>, PsychologistProfileUncheckedUpdateWithoutExpertisesInput>
  }

  export type PsychologistProfileCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<PsychologistProfileCreateWithoutSchedulesInput, PsychologistProfileUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutSchedulesInput
    connect?: PsychologistProfileWhereUniqueInput
  }

  export type SessionNoteCreateNestedOneWithoutScheduleInput = {
    create?: XOR<SessionNoteCreateWithoutScheduleInput, SessionNoteUncheckedCreateWithoutScheduleInput>
    connectOrCreate?: SessionNoteCreateOrConnectWithoutScheduleInput
    connect?: SessionNoteWhereUniqueInput
  }

  export type SessionNoteUncheckedCreateNestedOneWithoutScheduleInput = {
    create?: XOR<SessionNoteCreateWithoutScheduleInput, SessionNoteUncheckedCreateWithoutScheduleInput>
    connectOrCreate?: SessionNoteCreateOrConnectWithoutScheduleInput
    connect?: SessionNoteWhereUniqueInput
  }

  export type PsychologistProfileUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<PsychologistProfileCreateWithoutSchedulesInput, PsychologistProfileUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutSchedulesInput
    upsert?: PsychologistProfileUpsertWithoutSchedulesInput
    connect?: PsychologistProfileWhereUniqueInput
    update?: XOR<XOR<PsychologistProfileUpdateToOneWithWhereWithoutSchedulesInput, PsychologistProfileUpdateWithoutSchedulesInput>, PsychologistProfileUncheckedUpdateWithoutSchedulesInput>
  }

  export type SessionNoteUpdateOneWithoutScheduleNestedInput = {
    create?: XOR<SessionNoteCreateWithoutScheduleInput, SessionNoteUncheckedCreateWithoutScheduleInput>
    connectOrCreate?: SessionNoteCreateOrConnectWithoutScheduleInput
    upsert?: SessionNoteUpsertWithoutScheduleInput
    disconnect?: SessionNoteWhereInput | boolean
    delete?: SessionNoteWhereInput | boolean
    connect?: SessionNoteWhereUniqueInput
    update?: XOR<XOR<SessionNoteUpdateToOneWithWhereWithoutScheduleInput, SessionNoteUpdateWithoutScheduleInput>, SessionNoteUncheckedUpdateWithoutScheduleInput>
  }

  export type SessionNoteUncheckedUpdateOneWithoutScheduleNestedInput = {
    create?: XOR<SessionNoteCreateWithoutScheduleInput, SessionNoteUncheckedCreateWithoutScheduleInput>
    connectOrCreate?: SessionNoteCreateOrConnectWithoutScheduleInput
    upsert?: SessionNoteUpsertWithoutScheduleInput
    disconnect?: SessionNoteWhereInput | boolean
    delete?: SessionNoteWhereInput | boolean
    connect?: SessionNoteWhereUniqueInput
    update?: XOR<XOR<SessionNoteUpdateToOneWithWhereWithoutScheduleInput, SessionNoteUpdateWithoutScheduleInput>, SessionNoteUncheckedUpdateWithoutScheduleInput>
  }

  export type UserCreateNestedOneWithoutEmailVerificationsInput = {
    create?: XOR<UserCreateWithoutEmailVerificationsInput, UserUncheckedCreateWithoutEmailVerificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailVerificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEmailVerificationsNestedInput = {
    create?: XOR<UserCreateWithoutEmailVerificationsInput, UserUncheckedCreateWithoutEmailVerificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailVerificationsInput
    upsert?: UserUpsertWithoutEmailVerificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmailVerificationsInput, UserUpdateWithoutEmailVerificationsInput>, UserUncheckedUpdateWithoutEmailVerificationsInput>
  }

  export type SessionNoteCreatetagsInput = {
    set: string[]
  }

  export type PsychologistProfileCreateNestedOneWithoutSessionNotesInput = {
    create?: XOR<PsychologistProfileCreateWithoutSessionNotesInput, PsychologistProfileUncheckedCreateWithoutSessionNotesInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutSessionNotesInput
    connect?: PsychologistProfileWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSessionNotesInput = {
    create?: XOR<UserCreateWithoutSessionNotesInput, UserUncheckedCreateWithoutSessionNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionNotesInput
    connect?: UserWhereUniqueInput
  }

  export type ScheduleCreateNestedOneWithoutSessionNoteInput = {
    create?: XOR<ScheduleCreateWithoutSessionNoteInput, ScheduleUncheckedCreateWithoutSessionNoteInput>
    connectOrCreate?: ScheduleCreateOrConnectWithoutSessionNoteInput
    connect?: ScheduleWhereUniqueInput
  }

  export type EnumRiskLevelFieldUpdateOperationsInput = {
    set?: $Enums.RiskLevel
  }

  export type SessionNoteUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PsychologistProfileUpdateOneRequiredWithoutSessionNotesNestedInput = {
    create?: XOR<PsychologistProfileCreateWithoutSessionNotesInput, PsychologistProfileUncheckedCreateWithoutSessionNotesInput>
    connectOrCreate?: PsychologistProfileCreateOrConnectWithoutSessionNotesInput
    upsert?: PsychologistProfileUpsertWithoutSessionNotesInput
    connect?: PsychologistProfileWhereUniqueInput
    update?: XOR<XOR<PsychologistProfileUpdateToOneWithWhereWithoutSessionNotesInput, PsychologistProfileUpdateWithoutSessionNotesInput>, PsychologistProfileUncheckedUpdateWithoutSessionNotesInput>
  }

  export type UserUpdateOneRequiredWithoutSessionNotesNestedInput = {
    create?: XOR<UserCreateWithoutSessionNotesInput, UserUncheckedCreateWithoutSessionNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionNotesInput
    upsert?: UserUpsertWithoutSessionNotesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionNotesInput, UserUpdateWithoutSessionNotesInput>, UserUncheckedUpdateWithoutSessionNotesInput>
  }

  export type ScheduleUpdateOneWithoutSessionNoteNestedInput = {
    create?: XOR<ScheduleCreateWithoutSessionNoteInput, ScheduleUncheckedCreateWithoutSessionNoteInput>
    connectOrCreate?: ScheduleCreateOrConnectWithoutSessionNoteInput
    upsert?: ScheduleUpsertWithoutSessionNoteInput
    disconnect?: ScheduleWhereInput | boolean
    delete?: ScheduleWhereInput | boolean
    connect?: ScheduleWhereUniqueInput
    update?: XOR<XOR<ScheduleUpdateToOneWithWhereWithoutSessionNoteInput, ScheduleUpdateWithoutSessionNoteInput>, ScheduleUncheckedUpdateWithoutSessionNoteInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumRiskLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel>
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskLevelFilter<$PrismaModel> | $Enums.RiskLevel
  }

  export type NestedEnumRiskLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel>
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskLevelWithAggregatesFilter<$PrismaModel> | $Enums.RiskLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRiskLevelFilter<$PrismaModel>
    _max?: NestedEnumRiskLevelFilter<$PrismaModel>
  }

  export type AuthProviderCreateWithoutUserInput = {
    id?: string
    provider: string
    providerId?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthProviderUncheckedCreateWithoutUserInput = {
    id?: string
    provider: string
    providerId?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthProviderCreateOrConnectWithoutUserInput = {
    where: AuthProviderWhereUniqueInput
    create: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PasswordResetUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PasswordResetCreateOrConnectWithoutUserInput = {
    where: PasswordResetWhereUniqueInput
    create: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetCreateManyUserInputEnvelope = {
    data: PasswordResetCreateManyUserInput | PasswordResetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserProfileCreateWithoutUserInput = {
    id?: string
    fullName?: string | null
    birthday?: Date | string | null
    gender?: $Enums.Gender | null
    country?: string | null
    city?: string | null
    fullAddress?: string | null
    phone?: string | null
  }

  export type UserProfileUncheckedCreateWithoutUserInput = {
    id?: string
    fullName?: string | null
    birthday?: Date | string | null
    gender?: $Enums.Gender | null
    country?: string | null
    city?: string | null
    fullAddress?: string | null
    phone?: string | null
  }

  export type UserProfileCreateOrConnectWithoutUserInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
  }

  export type PsychologistProfileCreateWithoutUserInput = {
    id?: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    educations?: EducationCreateNestedManyWithoutPsychologistInput
    experiences?: ExperienceCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileUncheckedCreateWithoutUserInput = {
    id?: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    educations?: EducationUncheckedCreateNestedManyWithoutPsychologistInput
    experiences?: ExperienceUncheckedCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationUncheckedCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseUncheckedCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteUncheckedCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileCreateOrConnectWithoutUserInput = {
    where: PsychologistProfileWhereUniqueInput
    create: XOR<PsychologistProfileCreateWithoutUserInput, PsychologistProfileUncheckedCreateWithoutUserInput>
  }

  export type EmailVerificationCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type EmailVerificationUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type EmailVerificationCreateOrConnectWithoutUserInput = {
    where: EmailVerificationWhereUniqueInput
    create: XOR<EmailVerificationCreateWithoutUserInput, EmailVerificationUncheckedCreateWithoutUserInput>
  }

  export type EmailVerificationCreateManyUserInputEnvelope = {
    data: EmailVerificationCreateManyUserInput | EmailVerificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionNoteCreateWithoutUserInput = {
    id?: string
    subjective?: string | null
    objective?: string | null
    assessment?: string | null
    plan?: string | null
    riskLevel?: $Enums.RiskLevel
    followUpDate?: Date | string | null
    nextSessionRecommendation?: string | null
    tags?: SessionNoteCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    psychologistProfile: PsychologistProfileCreateNestedOneWithoutSessionNotesInput
    schedule?: ScheduleCreateNestedOneWithoutSessionNoteInput
  }

  export type SessionNoteUncheckedCreateWithoutUserInput = {
    id?: string
    psychologistProfileId: string
    scheduleId?: string | null
    subjective?: string | null
    objective?: string | null
    assessment?: string | null
    plan?: string | null
    riskLevel?: $Enums.RiskLevel
    followUpDate?: Date | string | null
    nextSessionRecommendation?: string | null
    tags?: SessionNoteCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type SessionNoteCreateOrConnectWithoutUserInput = {
    where: SessionNoteWhereUniqueInput
    create: XOR<SessionNoteCreateWithoutUserInput, SessionNoteUncheckedCreateWithoutUserInput>
  }

  export type SessionNoteCreateManyUserInputEnvelope = {
    data: SessionNoteCreateManyUserInput | SessionNoteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuthProviderUpsertWithoutUserInput = {
    update: XOR<AuthProviderUpdateWithoutUserInput, AuthProviderUncheckedUpdateWithoutUserInput>
    create: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>
    where?: AuthProviderWhereInput
  }

  export type AuthProviderUpdateToOneWithWhereWithoutUserInput = {
    where?: AuthProviderWhereInput
    data: XOR<AuthProviderUpdateWithoutUserInput, AuthProviderUncheckedUpdateWithoutUserInput>
  }

  export type AuthProviderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthProviderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordResetWhereUniqueInput
    update: XOR<PasswordResetUpdateWithoutUserInput, PasswordResetUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordResetWhereUniqueInput
    data: XOR<PasswordResetUpdateWithoutUserInput, PasswordResetUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetUpdateManyWithWhereWithoutUserInput = {
    where: PasswordResetScalarWhereInput
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordResetScalarWhereInput = {
    AND?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
    OR?: PasswordResetScalarWhereInput[]
    NOT?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
    id?: StringFilter<"PasswordReset"> | string
    userId?: StringFilter<"PasswordReset"> | string
    token?: StringFilter<"PasswordReset"> | string
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
    usedAt?: DateTimeNullableFilter<"PasswordReset"> | Date | string | null
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
  }

  export type UserProfileUpsertWithoutUserInput = {
    update: XOR<UserProfileUpdateWithoutUserInput, UserProfileUncheckedUpdateWithoutUserInput>
    create: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutUserInput, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type UserProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    fullAddress?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    fullAddress?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PsychologistProfileUpsertWithoutUserInput = {
    update: XOR<PsychologistProfileUpdateWithoutUserInput, PsychologistProfileUncheckedUpdateWithoutUserInput>
    create: XOR<PsychologistProfileCreateWithoutUserInput, PsychologistProfileUncheckedCreateWithoutUserInput>
    where?: PsychologistProfileWhereInput
  }

  export type PsychologistProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: PsychologistProfileWhereInput
    data: XOR<PsychologistProfileUpdateWithoutUserInput, PsychologistProfileUncheckedUpdateWithoutUserInput>
  }

  export type PsychologistProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    educations?: EducationUpdateManyWithoutPsychologistNestedInput
    experiences?: ExperienceUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type PsychologistProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    educations?: EducationUncheckedUpdateManyWithoutPsychologistNestedInput
    experiences?: ExperienceUncheckedUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUncheckedUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUncheckedUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUncheckedUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type EmailVerificationUpsertWithWhereUniqueWithoutUserInput = {
    where: EmailVerificationWhereUniqueInput
    update: XOR<EmailVerificationUpdateWithoutUserInput, EmailVerificationUncheckedUpdateWithoutUserInput>
    create: XOR<EmailVerificationCreateWithoutUserInput, EmailVerificationUncheckedCreateWithoutUserInput>
  }

  export type EmailVerificationUpdateWithWhereUniqueWithoutUserInput = {
    where: EmailVerificationWhereUniqueInput
    data: XOR<EmailVerificationUpdateWithoutUserInput, EmailVerificationUncheckedUpdateWithoutUserInput>
  }

  export type EmailVerificationUpdateManyWithWhereWithoutUserInput = {
    where: EmailVerificationScalarWhereInput
    data: XOR<EmailVerificationUpdateManyMutationInput, EmailVerificationUncheckedUpdateManyWithoutUserInput>
  }

  export type EmailVerificationScalarWhereInput = {
    AND?: EmailVerificationScalarWhereInput | EmailVerificationScalarWhereInput[]
    OR?: EmailVerificationScalarWhereInput[]
    NOT?: EmailVerificationScalarWhereInput | EmailVerificationScalarWhereInput[]
    id?: StringFilter<"EmailVerification"> | string
    userId?: StringFilter<"EmailVerification"> | string
    token?: StringFilter<"EmailVerification"> | string
    expiresAt?: DateTimeFilter<"EmailVerification"> | Date | string
    usedAt?: DateTimeNullableFilter<"EmailVerification"> | Date | string | null
    createdAt?: DateTimeFilter<"EmailVerification"> | Date | string
  }

  export type SessionNoteUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionNoteWhereUniqueInput
    update: XOR<SessionNoteUpdateWithoutUserInput, SessionNoteUncheckedUpdateWithoutUserInput>
    create: XOR<SessionNoteCreateWithoutUserInput, SessionNoteUncheckedCreateWithoutUserInput>
  }

  export type SessionNoteUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionNoteWhereUniqueInput
    data: XOR<SessionNoteUpdateWithoutUserInput, SessionNoteUncheckedUpdateWithoutUserInput>
  }

  export type SessionNoteUpdateManyWithWhereWithoutUserInput = {
    where: SessionNoteScalarWhereInput
    data: XOR<SessionNoteUpdateManyMutationInput, SessionNoteUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionNoteScalarWhereInput = {
    AND?: SessionNoteScalarWhereInput | SessionNoteScalarWhereInput[]
    OR?: SessionNoteScalarWhereInput[]
    NOT?: SessionNoteScalarWhereInput | SessionNoteScalarWhereInput[]
    id?: StringFilter<"SessionNote"> | string
    psychologistProfileId?: StringFilter<"SessionNote"> | string
    userId?: StringFilter<"SessionNote"> | string
    scheduleId?: StringNullableFilter<"SessionNote"> | string | null
    subjective?: StringNullableFilter<"SessionNote"> | string | null
    objective?: StringNullableFilter<"SessionNote"> | string | null
    assessment?: StringNullableFilter<"SessionNote"> | string | null
    plan?: StringNullableFilter<"SessionNote"> | string | null
    riskLevel?: EnumRiskLevelFilter<"SessionNote"> | $Enums.RiskLevel
    followUpDate?: DateTimeNullableFilter<"SessionNote"> | Date | string | null
    nextSessionRecommendation?: StringNullableFilter<"SessionNote"> | string | null
    tags?: StringNullableListFilter<"SessionNote">
    createdAt?: DateTimeFilter<"SessionNote"> | Date | string
    updatedAt?: DateTimeFilter<"SessionNote"> | Date | string
    deletedAt?: DateTimeNullableFilter<"SessionNote"> | Date | string | null
  }

  export type UserCreateWithoutAuthProviderInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordResets?: PasswordResetCreateNestedManyWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    psychologistProfile?: PsychologistProfileCreateNestedOneWithoutUserInput
    emailVerifications?: EmailVerificationCreateNestedManyWithoutUserInput
    sessionNotes?: SessionNoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuthProviderInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordResets?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    psychologistProfile?: PsychologistProfileUncheckedCreateNestedOneWithoutUserInput
    emailVerifications?: EmailVerificationUncheckedCreateNestedManyWithoutUserInput
    sessionNotes?: SessionNoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuthProviderInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthProviderInput, UserUncheckedCreateWithoutAuthProviderInput>
  }

  export type UserUpsertWithoutAuthProviderInput = {
    update: XOR<UserUpdateWithoutAuthProviderInput, UserUncheckedUpdateWithoutAuthProviderInput>
    create: XOR<UserCreateWithoutAuthProviderInput, UserUncheckedCreateWithoutAuthProviderInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthProviderInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthProviderInput, UserUncheckedUpdateWithoutAuthProviderInput>
  }

  export type UserUpdateWithoutAuthProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordResets?: PasswordResetUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    psychologistProfile?: PsychologistProfileUpdateOneWithoutUserNestedInput
    emailVerifications?: EmailVerificationUpdateManyWithoutUserNestedInput
    sessionNotes?: SessionNoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordResets?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    psychologistProfile?: PsychologistProfileUncheckedUpdateOneWithoutUserNestedInput
    emailVerifications?: EmailVerificationUncheckedUpdateManyWithoutUserNestedInput
    sessionNotes?: SessionNoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPasswordResetsInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authProvider?: AuthProviderCreateNestedOneWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    psychologistProfile?: PsychologistProfileCreateNestedOneWithoutUserInput
    emailVerifications?: EmailVerificationCreateNestedManyWithoutUserInput
    sessionNotes?: SessionNoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordResetsInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authProvider?: AuthProviderUncheckedCreateNestedOneWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    psychologistProfile?: PsychologistProfileUncheckedCreateNestedOneWithoutUserInput
    emailVerifications?: EmailVerificationUncheckedCreateNestedManyWithoutUserInput
    sessionNotes?: SessionNoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordResetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordResetsInput, UserUncheckedCreateWithoutPasswordResetsInput>
  }

  export type UserUpsertWithoutPasswordResetsInput = {
    update: XOR<UserUpdateWithoutPasswordResetsInput, UserUncheckedUpdateWithoutPasswordResetsInput>
    create: XOR<UserCreateWithoutPasswordResetsInput, UserUncheckedCreateWithoutPasswordResetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordResetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordResetsInput, UserUncheckedUpdateWithoutPasswordResetsInput>
  }

  export type UserUpdateWithoutPasswordResetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProvider?: AuthProviderUpdateOneWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    psychologistProfile?: PsychologistProfileUpdateOneWithoutUserNestedInput
    emailVerifications?: EmailVerificationUpdateManyWithoutUserNestedInput
    sessionNotes?: SessionNoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordResetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProvider?: AuthProviderUncheckedUpdateOneWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    psychologistProfile?: PsychologistProfileUncheckedUpdateOneWithoutUserNestedInput
    emailVerifications?: EmailVerificationUncheckedUpdateManyWithoutUserNestedInput
    sessionNotes?: SessionNoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutUserProfileInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authProvider?: AuthProviderCreateNestedOneWithoutUserInput
    passwordResets?: PasswordResetCreateNestedManyWithoutUserInput
    psychologistProfile?: PsychologistProfileCreateNestedOneWithoutUserInput
    emailVerifications?: EmailVerificationCreateNestedManyWithoutUserInput
    sessionNotes?: SessionNoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserProfileInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authProvider?: AuthProviderUncheckedCreateNestedOneWithoutUserInput
    passwordResets?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    psychologistProfile?: PsychologistProfileUncheckedCreateNestedOneWithoutUserInput
    emailVerifications?: EmailVerificationUncheckedCreateNestedManyWithoutUserInput
    sessionNotes?: SessionNoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserProfileInput, UserUncheckedCreateWithoutUserProfileInput>
  }

  export type UserUpsertWithoutUserProfileInput = {
    update: XOR<UserUpdateWithoutUserProfileInput, UserUncheckedUpdateWithoutUserProfileInput>
    create: XOR<UserCreateWithoutUserProfileInput, UserUncheckedCreateWithoutUserProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserProfileInput, UserUncheckedUpdateWithoutUserProfileInput>
  }

  export type UserUpdateWithoutUserProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProvider?: AuthProviderUpdateOneWithoutUserNestedInput
    passwordResets?: PasswordResetUpdateManyWithoutUserNestedInput
    psychologistProfile?: PsychologistProfileUpdateOneWithoutUserNestedInput
    emailVerifications?: EmailVerificationUpdateManyWithoutUserNestedInput
    sessionNotes?: SessionNoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProvider?: AuthProviderUncheckedUpdateOneWithoutUserNestedInput
    passwordResets?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    psychologistProfile?: PsychologistProfileUncheckedUpdateOneWithoutUserNestedInput
    emailVerifications?: EmailVerificationUncheckedUpdateManyWithoutUserNestedInput
    sessionNotes?: SessionNoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPsychologistProfileInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authProvider?: AuthProviderCreateNestedOneWithoutUserInput
    passwordResets?: PasswordResetCreateNestedManyWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    emailVerifications?: EmailVerificationCreateNestedManyWithoutUserInput
    sessionNotes?: SessionNoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPsychologistProfileInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authProvider?: AuthProviderUncheckedCreateNestedOneWithoutUserInput
    passwordResets?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    emailVerifications?: EmailVerificationUncheckedCreateNestedManyWithoutUserInput
    sessionNotes?: SessionNoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPsychologistProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPsychologistProfileInput, UserUncheckedCreateWithoutPsychologistProfileInput>
  }

  export type EducationCreateWithoutPsychologistInput = {
    id?: string
    degree: string
    institution: string
    city: string
    startYear: number
    endYear: number
    createdAt?: Date | string
  }

  export type EducationUncheckedCreateWithoutPsychologistInput = {
    id?: string
    degree: string
    institution: string
    city: string
    startYear: number
    endYear: number
    createdAt?: Date | string
  }

  export type EducationCreateOrConnectWithoutPsychologistInput = {
    where: EducationWhereUniqueInput
    create: XOR<EducationCreateWithoutPsychologistInput, EducationUncheckedCreateWithoutPsychologistInput>
  }

  export type EducationCreateManyPsychologistInputEnvelope = {
    data: EducationCreateManyPsychologistInput | EducationCreateManyPsychologistInput[]
    skipDuplicates?: boolean
  }

  export type ExperienceCreateWithoutPsychologistInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type ExperienceUncheckedCreateWithoutPsychologistInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type ExperienceCreateOrConnectWithoutPsychologistInput = {
    where: ExperienceWhereUniqueInput
    create: XOR<ExperienceCreateWithoutPsychologistInput, ExperienceUncheckedCreateWithoutPsychologistInput>
  }

  export type ExperienceCreateManyPsychologistInputEnvelope = {
    data: ExperienceCreateManyPsychologistInput | ExperienceCreateManyPsychologistInput[]
    skipDuplicates?: boolean
  }

  export type SpecializationCreateWithoutPsychologistInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type SpecializationUncheckedCreateWithoutPsychologistInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type SpecializationCreateOrConnectWithoutPsychologistInput = {
    where: SpecializationWhereUniqueInput
    create: XOR<SpecializationCreateWithoutPsychologistInput, SpecializationUncheckedCreateWithoutPsychologistInput>
  }

  export type SpecializationCreateManyPsychologistInputEnvelope = {
    data: SpecializationCreateManyPsychologistInput | SpecializationCreateManyPsychologistInput[]
    skipDuplicates?: boolean
  }

  export type ExpertiseCreateWithoutPsychologistInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type ExpertiseUncheckedCreateWithoutPsychologistInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type ExpertiseCreateOrConnectWithoutPsychologistInput = {
    where: ExpertiseWhereUniqueInput
    create: XOR<ExpertiseCreateWithoutPsychologistInput, ExpertiseUncheckedCreateWithoutPsychologistInput>
  }

  export type ExpertiseCreateManyPsychologistInputEnvelope = {
    data: ExpertiseCreateManyPsychologistInput | ExpertiseCreateManyPsychologistInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleCreateWithoutPsychologistInput = {
    id?: string
    date: Date | string
    startTime: string
    duration: number
    isAvailable?: boolean
    createdAt?: Date | string
    sessionNote?: SessionNoteCreateNestedOneWithoutScheduleInput
  }

  export type ScheduleUncheckedCreateWithoutPsychologistInput = {
    id?: string
    date: Date | string
    startTime: string
    duration: number
    isAvailable?: boolean
    createdAt?: Date | string
    sessionNote?: SessionNoteUncheckedCreateNestedOneWithoutScheduleInput
  }

  export type ScheduleCreateOrConnectWithoutPsychologistInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutPsychologistInput, ScheduleUncheckedCreateWithoutPsychologistInput>
  }

  export type ScheduleCreateManyPsychologistInputEnvelope = {
    data: ScheduleCreateManyPsychologistInput | ScheduleCreateManyPsychologistInput[]
    skipDuplicates?: boolean
  }

  export type SessionNoteCreateWithoutPsychologistProfileInput = {
    id?: string
    subjective?: string | null
    objective?: string | null
    assessment?: string | null
    plan?: string | null
    riskLevel?: $Enums.RiskLevel
    followUpDate?: Date | string | null
    nextSessionRecommendation?: string | null
    tags?: SessionNoteCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutSessionNotesInput
    schedule?: ScheduleCreateNestedOneWithoutSessionNoteInput
  }

  export type SessionNoteUncheckedCreateWithoutPsychologistProfileInput = {
    id?: string
    userId: string
    scheduleId?: string | null
    subjective?: string | null
    objective?: string | null
    assessment?: string | null
    plan?: string | null
    riskLevel?: $Enums.RiskLevel
    followUpDate?: Date | string | null
    nextSessionRecommendation?: string | null
    tags?: SessionNoteCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type SessionNoteCreateOrConnectWithoutPsychologistProfileInput = {
    where: SessionNoteWhereUniqueInput
    create: XOR<SessionNoteCreateWithoutPsychologistProfileInput, SessionNoteUncheckedCreateWithoutPsychologistProfileInput>
  }

  export type SessionNoteCreateManyPsychologistProfileInputEnvelope = {
    data: SessionNoteCreateManyPsychologistProfileInput | SessionNoteCreateManyPsychologistProfileInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPsychologistProfileInput = {
    update: XOR<UserUpdateWithoutPsychologistProfileInput, UserUncheckedUpdateWithoutPsychologistProfileInput>
    create: XOR<UserCreateWithoutPsychologistProfileInput, UserUncheckedCreateWithoutPsychologistProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPsychologistProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPsychologistProfileInput, UserUncheckedUpdateWithoutPsychologistProfileInput>
  }

  export type UserUpdateWithoutPsychologistProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProvider?: AuthProviderUpdateOneWithoutUserNestedInput
    passwordResets?: PasswordResetUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    emailVerifications?: EmailVerificationUpdateManyWithoutUserNestedInput
    sessionNotes?: SessionNoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPsychologistProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProvider?: AuthProviderUncheckedUpdateOneWithoutUserNestedInput
    passwordResets?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    emailVerifications?: EmailVerificationUncheckedUpdateManyWithoutUserNestedInput
    sessionNotes?: SessionNoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EducationUpsertWithWhereUniqueWithoutPsychologistInput = {
    where: EducationWhereUniqueInput
    update: XOR<EducationUpdateWithoutPsychologistInput, EducationUncheckedUpdateWithoutPsychologistInput>
    create: XOR<EducationCreateWithoutPsychologistInput, EducationUncheckedCreateWithoutPsychologistInput>
  }

  export type EducationUpdateWithWhereUniqueWithoutPsychologistInput = {
    where: EducationWhereUniqueInput
    data: XOR<EducationUpdateWithoutPsychologistInput, EducationUncheckedUpdateWithoutPsychologistInput>
  }

  export type EducationUpdateManyWithWhereWithoutPsychologistInput = {
    where: EducationScalarWhereInput
    data: XOR<EducationUpdateManyMutationInput, EducationUncheckedUpdateManyWithoutPsychologistInput>
  }

  export type EducationScalarWhereInput = {
    AND?: EducationScalarWhereInput | EducationScalarWhereInput[]
    OR?: EducationScalarWhereInput[]
    NOT?: EducationScalarWhereInput | EducationScalarWhereInput[]
    id?: StringFilter<"Education"> | string
    psychologistId?: StringFilter<"Education"> | string
    degree?: StringFilter<"Education"> | string
    institution?: StringFilter<"Education"> | string
    city?: StringFilter<"Education"> | string
    startYear?: IntFilter<"Education"> | number
    endYear?: IntFilter<"Education"> | number
    createdAt?: DateTimeFilter<"Education"> | Date | string
  }

  export type ExperienceUpsertWithWhereUniqueWithoutPsychologistInput = {
    where: ExperienceWhereUniqueInput
    update: XOR<ExperienceUpdateWithoutPsychologistInput, ExperienceUncheckedUpdateWithoutPsychologistInput>
    create: XOR<ExperienceCreateWithoutPsychologistInput, ExperienceUncheckedCreateWithoutPsychologistInput>
  }

  export type ExperienceUpdateWithWhereUniqueWithoutPsychologistInput = {
    where: ExperienceWhereUniqueInput
    data: XOR<ExperienceUpdateWithoutPsychologistInput, ExperienceUncheckedUpdateWithoutPsychologistInput>
  }

  export type ExperienceUpdateManyWithWhereWithoutPsychologistInput = {
    where: ExperienceScalarWhereInput
    data: XOR<ExperienceUpdateManyMutationInput, ExperienceUncheckedUpdateManyWithoutPsychologistInput>
  }

  export type ExperienceScalarWhereInput = {
    AND?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[]
    OR?: ExperienceScalarWhereInput[]
    NOT?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[]
    id?: StringFilter<"Experience"> | string
    psychologistId?: StringFilter<"Experience"> | string
    name?: StringFilter<"Experience"> | string
    createdAt?: DateTimeFilter<"Experience"> | Date | string
  }

  export type SpecializationUpsertWithWhereUniqueWithoutPsychologistInput = {
    where: SpecializationWhereUniqueInput
    update: XOR<SpecializationUpdateWithoutPsychologistInput, SpecializationUncheckedUpdateWithoutPsychologistInput>
    create: XOR<SpecializationCreateWithoutPsychologistInput, SpecializationUncheckedCreateWithoutPsychologistInput>
  }

  export type SpecializationUpdateWithWhereUniqueWithoutPsychologistInput = {
    where: SpecializationWhereUniqueInput
    data: XOR<SpecializationUpdateWithoutPsychologistInput, SpecializationUncheckedUpdateWithoutPsychologistInput>
  }

  export type SpecializationUpdateManyWithWhereWithoutPsychologistInput = {
    where: SpecializationScalarWhereInput
    data: XOR<SpecializationUpdateManyMutationInput, SpecializationUncheckedUpdateManyWithoutPsychologistInput>
  }

  export type SpecializationScalarWhereInput = {
    AND?: SpecializationScalarWhereInput | SpecializationScalarWhereInput[]
    OR?: SpecializationScalarWhereInput[]
    NOT?: SpecializationScalarWhereInput | SpecializationScalarWhereInput[]
    id?: StringFilter<"Specialization"> | string
    psychologistId?: StringFilter<"Specialization"> | string
    name?: StringFilter<"Specialization"> | string
    createdAt?: DateTimeFilter<"Specialization"> | Date | string
  }

  export type ExpertiseUpsertWithWhereUniqueWithoutPsychologistInput = {
    where: ExpertiseWhereUniqueInput
    update: XOR<ExpertiseUpdateWithoutPsychologistInput, ExpertiseUncheckedUpdateWithoutPsychologistInput>
    create: XOR<ExpertiseCreateWithoutPsychologistInput, ExpertiseUncheckedCreateWithoutPsychologistInput>
  }

  export type ExpertiseUpdateWithWhereUniqueWithoutPsychologistInput = {
    where: ExpertiseWhereUniqueInput
    data: XOR<ExpertiseUpdateWithoutPsychologistInput, ExpertiseUncheckedUpdateWithoutPsychologistInput>
  }

  export type ExpertiseUpdateManyWithWhereWithoutPsychologistInput = {
    where: ExpertiseScalarWhereInput
    data: XOR<ExpertiseUpdateManyMutationInput, ExpertiseUncheckedUpdateManyWithoutPsychologistInput>
  }

  export type ExpertiseScalarWhereInput = {
    AND?: ExpertiseScalarWhereInput | ExpertiseScalarWhereInput[]
    OR?: ExpertiseScalarWhereInput[]
    NOT?: ExpertiseScalarWhereInput | ExpertiseScalarWhereInput[]
    id?: StringFilter<"Expertise"> | string
    psychologistId?: StringFilter<"Expertise"> | string
    name?: StringFilter<"Expertise"> | string
    createdAt?: DateTimeFilter<"Expertise"> | Date | string
  }

  export type ScheduleUpsertWithWhereUniqueWithoutPsychologistInput = {
    where: ScheduleWhereUniqueInput
    update: XOR<ScheduleUpdateWithoutPsychologistInput, ScheduleUncheckedUpdateWithoutPsychologistInput>
    create: XOR<ScheduleCreateWithoutPsychologistInput, ScheduleUncheckedCreateWithoutPsychologistInput>
  }

  export type ScheduleUpdateWithWhereUniqueWithoutPsychologistInput = {
    where: ScheduleWhereUniqueInput
    data: XOR<ScheduleUpdateWithoutPsychologistInput, ScheduleUncheckedUpdateWithoutPsychologistInput>
  }

  export type ScheduleUpdateManyWithWhereWithoutPsychologistInput = {
    where: ScheduleScalarWhereInput
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyWithoutPsychologistInput>
  }

  export type ScheduleScalarWhereInput = {
    AND?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    OR?: ScheduleScalarWhereInput[]
    NOT?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    id?: StringFilter<"Schedule"> | string
    psychologistId?: StringFilter<"Schedule"> | string
    date?: DateTimeFilter<"Schedule"> | Date | string
    startTime?: StringFilter<"Schedule"> | string
    duration?: IntFilter<"Schedule"> | number
    isAvailable?: BoolFilter<"Schedule"> | boolean
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
  }

  export type SessionNoteUpsertWithWhereUniqueWithoutPsychologistProfileInput = {
    where: SessionNoteWhereUniqueInput
    update: XOR<SessionNoteUpdateWithoutPsychologistProfileInput, SessionNoteUncheckedUpdateWithoutPsychologistProfileInput>
    create: XOR<SessionNoteCreateWithoutPsychologistProfileInput, SessionNoteUncheckedCreateWithoutPsychologistProfileInput>
  }

  export type SessionNoteUpdateWithWhereUniqueWithoutPsychologistProfileInput = {
    where: SessionNoteWhereUniqueInput
    data: XOR<SessionNoteUpdateWithoutPsychologistProfileInput, SessionNoteUncheckedUpdateWithoutPsychologistProfileInput>
  }

  export type SessionNoteUpdateManyWithWhereWithoutPsychologistProfileInput = {
    where: SessionNoteScalarWhereInput
    data: XOR<SessionNoteUpdateManyMutationInput, SessionNoteUncheckedUpdateManyWithoutPsychologistProfileInput>
  }

  export type PsychologistProfileCreateWithoutEducationsInput = {
    id?: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPsychologistProfileInput
    experiences?: ExperienceCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileUncheckedCreateWithoutEducationsInput = {
    id?: string
    userId: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    experiences?: ExperienceUncheckedCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationUncheckedCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseUncheckedCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteUncheckedCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileCreateOrConnectWithoutEducationsInput = {
    where: PsychologistProfileWhereUniqueInput
    create: XOR<PsychologistProfileCreateWithoutEducationsInput, PsychologistProfileUncheckedCreateWithoutEducationsInput>
  }

  export type PsychologistProfileUpsertWithoutEducationsInput = {
    update: XOR<PsychologistProfileUpdateWithoutEducationsInput, PsychologistProfileUncheckedUpdateWithoutEducationsInput>
    create: XOR<PsychologistProfileCreateWithoutEducationsInput, PsychologistProfileUncheckedCreateWithoutEducationsInput>
    where?: PsychologistProfileWhereInput
  }

  export type PsychologistProfileUpdateToOneWithWhereWithoutEducationsInput = {
    where?: PsychologistProfileWhereInput
    data: XOR<PsychologistProfileUpdateWithoutEducationsInput, PsychologistProfileUncheckedUpdateWithoutEducationsInput>
  }

  export type PsychologistProfileUpdateWithoutEducationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPsychologistProfileNestedInput
    experiences?: ExperienceUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type PsychologistProfileUncheckedUpdateWithoutEducationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    experiences?: ExperienceUncheckedUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUncheckedUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUncheckedUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUncheckedUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type PsychologistProfileCreateWithoutExperiencesInput = {
    id?: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPsychologistProfileInput
    educations?: EducationCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileUncheckedCreateWithoutExperiencesInput = {
    id?: string
    userId: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    educations?: EducationUncheckedCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationUncheckedCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseUncheckedCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteUncheckedCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileCreateOrConnectWithoutExperiencesInput = {
    where: PsychologistProfileWhereUniqueInput
    create: XOR<PsychologistProfileCreateWithoutExperiencesInput, PsychologistProfileUncheckedCreateWithoutExperiencesInput>
  }

  export type PsychologistProfileUpsertWithoutExperiencesInput = {
    update: XOR<PsychologistProfileUpdateWithoutExperiencesInput, PsychologistProfileUncheckedUpdateWithoutExperiencesInput>
    create: XOR<PsychologistProfileCreateWithoutExperiencesInput, PsychologistProfileUncheckedCreateWithoutExperiencesInput>
    where?: PsychologistProfileWhereInput
  }

  export type PsychologistProfileUpdateToOneWithWhereWithoutExperiencesInput = {
    where?: PsychologistProfileWhereInput
    data: XOR<PsychologistProfileUpdateWithoutExperiencesInput, PsychologistProfileUncheckedUpdateWithoutExperiencesInput>
  }

  export type PsychologistProfileUpdateWithoutExperiencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPsychologistProfileNestedInput
    educations?: EducationUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type PsychologistProfileUncheckedUpdateWithoutExperiencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    educations?: EducationUncheckedUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUncheckedUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUncheckedUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUncheckedUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type PsychologistProfileCreateWithoutSpecializationsInput = {
    id?: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPsychologistProfileInput
    educations?: EducationCreateNestedManyWithoutPsychologistInput
    experiences?: ExperienceCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileUncheckedCreateWithoutSpecializationsInput = {
    id?: string
    userId: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    educations?: EducationUncheckedCreateNestedManyWithoutPsychologistInput
    experiences?: ExperienceUncheckedCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseUncheckedCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteUncheckedCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileCreateOrConnectWithoutSpecializationsInput = {
    where: PsychologistProfileWhereUniqueInput
    create: XOR<PsychologistProfileCreateWithoutSpecializationsInput, PsychologistProfileUncheckedCreateWithoutSpecializationsInput>
  }

  export type PsychologistProfileUpsertWithoutSpecializationsInput = {
    update: XOR<PsychologistProfileUpdateWithoutSpecializationsInput, PsychologistProfileUncheckedUpdateWithoutSpecializationsInput>
    create: XOR<PsychologistProfileCreateWithoutSpecializationsInput, PsychologistProfileUncheckedCreateWithoutSpecializationsInput>
    where?: PsychologistProfileWhereInput
  }

  export type PsychologistProfileUpdateToOneWithWhereWithoutSpecializationsInput = {
    where?: PsychologistProfileWhereInput
    data: XOR<PsychologistProfileUpdateWithoutSpecializationsInput, PsychologistProfileUncheckedUpdateWithoutSpecializationsInput>
  }

  export type PsychologistProfileUpdateWithoutSpecializationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPsychologistProfileNestedInput
    educations?: EducationUpdateManyWithoutPsychologistNestedInput
    experiences?: ExperienceUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type PsychologistProfileUncheckedUpdateWithoutSpecializationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    educations?: EducationUncheckedUpdateManyWithoutPsychologistNestedInput
    experiences?: ExperienceUncheckedUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUncheckedUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUncheckedUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type PsychologistProfileCreateWithoutExpertisesInput = {
    id?: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPsychologistProfileInput
    educations?: EducationCreateNestedManyWithoutPsychologistInput
    experiences?: ExperienceCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileUncheckedCreateWithoutExpertisesInput = {
    id?: string
    userId: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    educations?: EducationUncheckedCreateNestedManyWithoutPsychologistInput
    experiences?: ExperienceUncheckedCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationUncheckedCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteUncheckedCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileCreateOrConnectWithoutExpertisesInput = {
    where: PsychologistProfileWhereUniqueInput
    create: XOR<PsychologistProfileCreateWithoutExpertisesInput, PsychologistProfileUncheckedCreateWithoutExpertisesInput>
  }

  export type PsychologistProfileUpsertWithoutExpertisesInput = {
    update: XOR<PsychologistProfileUpdateWithoutExpertisesInput, PsychologistProfileUncheckedUpdateWithoutExpertisesInput>
    create: XOR<PsychologistProfileCreateWithoutExpertisesInput, PsychologistProfileUncheckedCreateWithoutExpertisesInput>
    where?: PsychologistProfileWhereInput
  }

  export type PsychologistProfileUpdateToOneWithWhereWithoutExpertisesInput = {
    where?: PsychologistProfileWhereInput
    data: XOR<PsychologistProfileUpdateWithoutExpertisesInput, PsychologistProfileUncheckedUpdateWithoutExpertisesInput>
  }

  export type PsychologistProfileUpdateWithoutExpertisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPsychologistProfileNestedInput
    educations?: EducationUpdateManyWithoutPsychologistNestedInput
    experiences?: ExperienceUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type PsychologistProfileUncheckedUpdateWithoutExpertisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    educations?: EducationUncheckedUpdateManyWithoutPsychologistNestedInput
    experiences?: ExperienceUncheckedUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUncheckedUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUncheckedUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type PsychologistProfileCreateWithoutSchedulesInput = {
    id?: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPsychologistProfileInput
    educations?: EducationCreateNestedManyWithoutPsychologistInput
    experiences?: ExperienceCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileUncheckedCreateWithoutSchedulesInput = {
    id?: string
    userId: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    educations?: EducationUncheckedCreateNestedManyWithoutPsychologistInput
    experiences?: ExperienceUncheckedCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationUncheckedCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseUncheckedCreateNestedManyWithoutPsychologistInput
    sessionNotes?: SessionNoteUncheckedCreateNestedManyWithoutPsychologistProfileInput
  }

  export type PsychologistProfileCreateOrConnectWithoutSchedulesInput = {
    where: PsychologistProfileWhereUniqueInput
    create: XOR<PsychologistProfileCreateWithoutSchedulesInput, PsychologistProfileUncheckedCreateWithoutSchedulesInput>
  }

  export type SessionNoteCreateWithoutScheduleInput = {
    id?: string
    subjective?: string | null
    objective?: string | null
    assessment?: string | null
    plan?: string | null
    riskLevel?: $Enums.RiskLevel
    followUpDate?: Date | string | null
    nextSessionRecommendation?: string | null
    tags?: SessionNoteCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    psychologistProfile: PsychologistProfileCreateNestedOneWithoutSessionNotesInput
    user: UserCreateNestedOneWithoutSessionNotesInput
  }

  export type SessionNoteUncheckedCreateWithoutScheduleInput = {
    id?: string
    psychologistProfileId: string
    userId: string
    subjective?: string | null
    objective?: string | null
    assessment?: string | null
    plan?: string | null
    riskLevel?: $Enums.RiskLevel
    followUpDate?: Date | string | null
    nextSessionRecommendation?: string | null
    tags?: SessionNoteCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type SessionNoteCreateOrConnectWithoutScheduleInput = {
    where: SessionNoteWhereUniqueInput
    create: XOR<SessionNoteCreateWithoutScheduleInput, SessionNoteUncheckedCreateWithoutScheduleInput>
  }

  export type PsychologistProfileUpsertWithoutSchedulesInput = {
    update: XOR<PsychologistProfileUpdateWithoutSchedulesInput, PsychologistProfileUncheckedUpdateWithoutSchedulesInput>
    create: XOR<PsychologistProfileCreateWithoutSchedulesInput, PsychologistProfileUncheckedCreateWithoutSchedulesInput>
    where?: PsychologistProfileWhereInput
  }

  export type PsychologistProfileUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: PsychologistProfileWhereInput
    data: XOR<PsychologistProfileUpdateWithoutSchedulesInput, PsychologistProfileUncheckedUpdateWithoutSchedulesInput>
  }

  export type PsychologistProfileUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPsychologistProfileNestedInput
    educations?: EducationUpdateManyWithoutPsychologistNestedInput
    experiences?: ExperienceUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type PsychologistProfileUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    educations?: EducationUncheckedUpdateManyWithoutPsychologistNestedInput
    experiences?: ExperienceUncheckedUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUncheckedUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUncheckedUpdateManyWithoutPsychologistNestedInput
    sessionNotes?: SessionNoteUncheckedUpdateManyWithoutPsychologistProfileNestedInput
  }

  export type SessionNoteUpsertWithoutScheduleInput = {
    update: XOR<SessionNoteUpdateWithoutScheduleInput, SessionNoteUncheckedUpdateWithoutScheduleInput>
    create: XOR<SessionNoteCreateWithoutScheduleInput, SessionNoteUncheckedCreateWithoutScheduleInput>
    where?: SessionNoteWhereInput
  }

  export type SessionNoteUpdateToOneWithWhereWithoutScheduleInput = {
    where?: SessionNoteWhereInput
    data: XOR<SessionNoteUpdateWithoutScheduleInput, SessionNoteUncheckedUpdateWithoutScheduleInput>
  }

  export type SessionNoteUpdateWithoutScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjective?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextSessionRecommendation?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SessionNoteUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    psychologistProfile?: PsychologistProfileUpdateOneRequiredWithoutSessionNotesNestedInput
    user?: UserUpdateOneRequiredWithoutSessionNotesNestedInput
  }

  export type SessionNoteUncheckedUpdateWithoutScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistProfileId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    subjective?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextSessionRecommendation?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SessionNoteUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateWithoutEmailVerificationsInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authProvider?: AuthProviderCreateNestedOneWithoutUserInput
    passwordResets?: PasswordResetCreateNestedManyWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    psychologistProfile?: PsychologistProfileCreateNestedOneWithoutUserInput
    sessionNotes?: SessionNoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEmailVerificationsInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authProvider?: AuthProviderUncheckedCreateNestedOneWithoutUserInput
    passwordResets?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    psychologistProfile?: PsychologistProfileUncheckedCreateNestedOneWithoutUserInput
    sessionNotes?: SessionNoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEmailVerificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmailVerificationsInput, UserUncheckedCreateWithoutEmailVerificationsInput>
  }

  export type UserUpsertWithoutEmailVerificationsInput = {
    update: XOR<UserUpdateWithoutEmailVerificationsInput, UserUncheckedUpdateWithoutEmailVerificationsInput>
    create: XOR<UserCreateWithoutEmailVerificationsInput, UserUncheckedCreateWithoutEmailVerificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmailVerificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmailVerificationsInput, UserUncheckedUpdateWithoutEmailVerificationsInput>
  }

  export type UserUpdateWithoutEmailVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProvider?: AuthProviderUpdateOneWithoutUserNestedInput
    passwordResets?: PasswordResetUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    psychologistProfile?: PsychologistProfileUpdateOneWithoutUserNestedInput
    sessionNotes?: SessionNoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmailVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProvider?: AuthProviderUncheckedUpdateOneWithoutUserNestedInput
    passwordResets?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    psychologistProfile?: PsychologistProfileUncheckedUpdateOneWithoutUserNestedInput
    sessionNotes?: SessionNoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PsychologistProfileCreateWithoutSessionNotesInput = {
    id?: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPsychologistProfileInput
    educations?: EducationCreateNestedManyWithoutPsychologistInput
    experiences?: ExperienceCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleCreateNestedManyWithoutPsychologistInput
  }

  export type PsychologistProfileUncheckedCreateWithoutSessionNotesInput = {
    id?: string
    userId: string
    fullName: string
    sipp: string
    str: string
    about: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    educations?: EducationUncheckedCreateNestedManyWithoutPsychologistInput
    experiences?: ExperienceUncheckedCreateNestedManyWithoutPsychologistInput
    specializations?: SpecializationUncheckedCreateNestedManyWithoutPsychologistInput
    expertises?: ExpertiseUncheckedCreateNestedManyWithoutPsychologistInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutPsychologistInput
  }

  export type PsychologistProfileCreateOrConnectWithoutSessionNotesInput = {
    where: PsychologistProfileWhereUniqueInput
    create: XOR<PsychologistProfileCreateWithoutSessionNotesInput, PsychologistProfileUncheckedCreateWithoutSessionNotesInput>
  }

  export type UserCreateWithoutSessionNotesInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authProvider?: AuthProviderCreateNestedOneWithoutUserInput
    passwordResets?: PasswordResetCreateNestedManyWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    psychologistProfile?: PsychologistProfileCreateNestedOneWithoutUserInput
    emailVerifications?: EmailVerificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionNotesInput = {
    id?: string
    email: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    isProfileComplete?: boolean
    isFirstLogin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authProvider?: AuthProviderUncheckedCreateNestedOneWithoutUserInput
    passwordResets?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    psychologistProfile?: PsychologistProfileUncheckedCreateNestedOneWithoutUserInput
    emailVerifications?: EmailVerificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionNotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionNotesInput, UserUncheckedCreateWithoutSessionNotesInput>
  }

  export type ScheduleCreateWithoutSessionNoteInput = {
    id?: string
    date: Date | string
    startTime: string
    duration: number
    isAvailable?: boolean
    createdAt?: Date | string
    psychologist: PsychologistProfileCreateNestedOneWithoutSchedulesInput
  }

  export type ScheduleUncheckedCreateWithoutSessionNoteInput = {
    id?: string
    psychologistId: string
    date: Date | string
    startTime: string
    duration: number
    isAvailable?: boolean
    createdAt?: Date | string
  }

  export type ScheduleCreateOrConnectWithoutSessionNoteInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutSessionNoteInput, ScheduleUncheckedCreateWithoutSessionNoteInput>
  }

  export type PsychologistProfileUpsertWithoutSessionNotesInput = {
    update: XOR<PsychologistProfileUpdateWithoutSessionNotesInput, PsychologistProfileUncheckedUpdateWithoutSessionNotesInput>
    create: XOR<PsychologistProfileCreateWithoutSessionNotesInput, PsychologistProfileUncheckedCreateWithoutSessionNotesInput>
    where?: PsychologistProfileWhereInput
  }

  export type PsychologistProfileUpdateToOneWithWhereWithoutSessionNotesInput = {
    where?: PsychologistProfileWhereInput
    data: XOR<PsychologistProfileUpdateWithoutSessionNotesInput, PsychologistProfileUncheckedUpdateWithoutSessionNotesInput>
  }

  export type PsychologistProfileUpdateWithoutSessionNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPsychologistProfileNestedInput
    educations?: EducationUpdateManyWithoutPsychologistNestedInput
    experiences?: ExperienceUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUpdateManyWithoutPsychologistNestedInput
  }

  export type PsychologistProfileUncheckedUpdateWithoutSessionNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    sipp?: StringFieldUpdateOperationsInput | string
    str?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    educations?: EducationUncheckedUpdateManyWithoutPsychologistNestedInput
    experiences?: ExperienceUncheckedUpdateManyWithoutPsychologistNestedInput
    specializations?: SpecializationUncheckedUpdateManyWithoutPsychologistNestedInput
    expertises?: ExpertiseUncheckedUpdateManyWithoutPsychologistNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutPsychologistNestedInput
  }

  export type UserUpsertWithoutSessionNotesInput = {
    update: XOR<UserUpdateWithoutSessionNotesInput, UserUncheckedUpdateWithoutSessionNotesInput>
    create: XOR<UserCreateWithoutSessionNotesInput, UserUncheckedCreateWithoutSessionNotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionNotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionNotesInput, UserUncheckedUpdateWithoutSessionNotesInput>
  }

  export type UserUpdateWithoutSessionNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProvider?: AuthProviderUpdateOneWithoutUserNestedInput
    passwordResets?: PasswordResetUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    psychologistProfile?: PsychologistProfileUpdateOneWithoutUserNestedInput
    emailVerifications?: EmailVerificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isProfileComplete?: BoolFieldUpdateOperationsInput | boolean
    isFirstLogin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProvider?: AuthProviderUncheckedUpdateOneWithoutUserNestedInput
    passwordResets?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    psychologistProfile?: PsychologistProfileUncheckedUpdateOneWithoutUserNestedInput
    emailVerifications?: EmailVerificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ScheduleUpsertWithoutSessionNoteInput = {
    update: XOR<ScheduleUpdateWithoutSessionNoteInput, ScheduleUncheckedUpdateWithoutSessionNoteInput>
    create: XOR<ScheduleCreateWithoutSessionNoteInput, ScheduleUncheckedCreateWithoutSessionNoteInput>
    where?: ScheduleWhereInput
  }

  export type ScheduleUpdateToOneWithWhereWithoutSessionNoteInput = {
    where?: ScheduleWhereInput
    data: XOR<ScheduleUpdateWithoutSessionNoteInput, ScheduleUncheckedUpdateWithoutSessionNoteInput>
  }

  export type ScheduleUpdateWithoutSessionNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistProfileUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type ScheduleUncheckedUpdateWithoutSessionNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type EmailVerificationCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SessionNoteCreateManyUserInput = {
    id?: string
    psychologistProfileId: string
    scheduleId?: string | null
    subjective?: string | null
    objective?: string | null
    assessment?: string | null
    plan?: string | null
    riskLevel?: $Enums.RiskLevel
    followUpDate?: Date | string | null
    nextSessionRecommendation?: string | null
    tags?: SessionNoteCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PasswordResetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionNoteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjective?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextSessionRecommendation?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SessionNoteUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    psychologistProfile?: PsychologistProfileUpdateOneRequiredWithoutSessionNotesNestedInput
    schedule?: ScheduleUpdateOneWithoutSessionNoteNestedInput
  }

  export type SessionNoteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistProfileId?: StringFieldUpdateOperationsInput | string
    scheduleId?: NullableStringFieldUpdateOperationsInput | string | null
    subjective?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextSessionRecommendation?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SessionNoteUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionNoteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    psychologistProfileId?: StringFieldUpdateOperationsInput | string
    scheduleId?: NullableStringFieldUpdateOperationsInput | string | null
    subjective?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextSessionRecommendation?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SessionNoteUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EducationCreateManyPsychologistInput = {
    id?: string
    degree: string
    institution: string
    city: string
    startYear: number
    endYear: number
    createdAt?: Date | string
  }

  export type ExperienceCreateManyPsychologistInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type SpecializationCreateManyPsychologistInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type ExpertiseCreateManyPsychologistInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type ScheduleCreateManyPsychologistInput = {
    id?: string
    date: Date | string
    startTime: string
    duration: number
    isAvailable?: boolean
    createdAt?: Date | string
  }

  export type SessionNoteCreateManyPsychologistProfileInput = {
    id?: string
    userId: string
    scheduleId?: string | null
    subjective?: string | null
    objective?: string | null
    assessment?: string | null
    plan?: string | null
    riskLevel?: $Enums.RiskLevel
    followUpDate?: Date | string | null
    nextSessionRecommendation?: string | null
    tags?: SessionNoteCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type EducationUpdateWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationUncheckedUpdateWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationUncheckedUpdateManyWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperienceUpdateWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperienceUncheckedUpdateWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperienceUncheckedUpdateManyWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpecializationUpdateWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpecializationUncheckedUpdateWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpecializationUncheckedUpdateManyWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpertiseUpdateWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpertiseUncheckedUpdateWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpertiseUncheckedUpdateManyWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUpdateWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionNote?: SessionNoteUpdateOneWithoutScheduleNestedInput
  }

  export type ScheduleUncheckedUpdateWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionNote?: SessionNoteUncheckedUpdateOneWithoutScheduleNestedInput
  }

  export type ScheduleUncheckedUpdateManyWithoutPsychologistInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionNoteUpdateWithoutPsychologistProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjective?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextSessionRecommendation?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SessionNoteUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutSessionNotesNestedInput
    schedule?: ScheduleUpdateOneWithoutSessionNoteNestedInput
  }

  export type SessionNoteUncheckedUpdateWithoutPsychologistProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scheduleId?: NullableStringFieldUpdateOperationsInput | string | null
    subjective?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextSessionRecommendation?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SessionNoteUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionNoteUncheckedUpdateManyWithoutPsychologistProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scheduleId?: NullableStringFieldUpdateOperationsInput | string | null
    subjective?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextSessionRecommendation?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: SessionNoteUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}