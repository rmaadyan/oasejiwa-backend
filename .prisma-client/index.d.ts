
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
 * Model Psychologist
 * 
 */
export type Psychologist = $Result.DefaultSelection<Prisma.$PsychologistPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model SessionNote
 * 
 */
export type SessionNote = $Result.DefaultSelection<Prisma.$SessionNotePayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

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


export const RiskLevel: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

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
   * `prisma.psychologist`: Exposes CRUD operations for the **Psychologist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Psychologists
    * const psychologists = await prisma.psychologist.findMany()
    * ```
    */
  get psychologist(): Prisma.PsychologistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sessionNote`: Exposes CRUD operations for the **SessionNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SessionNotes
    * const sessionNotes = await prisma.sessionNote.findMany()
    * ```
    */
  get sessionNote(): Prisma.SessionNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
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
    Psychologist: 'Psychologist',
    Session: 'Session',
    SessionNote: 'SessionNote',
    AuditLog: 'AuditLog'
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
      modelProps: "user" | "psychologist" | "session" | "sessionNote" | "auditLog"
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
      Psychologist: {
        payload: Prisma.$PsychologistPayload<ExtArgs>
        fields: Prisma.PsychologistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PsychologistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PsychologistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistPayload>
          }
          findFirst: {
            args: Prisma.PsychologistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PsychologistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistPayload>
          }
          findMany: {
            args: Prisma.PsychologistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistPayload>[]
          }
          create: {
            args: Prisma.PsychologistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistPayload>
          }
          createMany: {
            args: Prisma.PsychologistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PsychologistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistPayload>[]
          }
          delete: {
            args: Prisma.PsychologistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistPayload>
          }
          update: {
            args: Prisma.PsychologistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistPayload>
          }
          deleteMany: {
            args: Prisma.PsychologistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PsychologistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PsychologistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistPayload>[]
          }
          upsert: {
            args: Prisma.PsychologistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PsychologistPayload>
          }
          aggregate: {
            args: Prisma.PsychologistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePsychologist>
          }
          groupBy: {
            args: Prisma.PsychologistGroupByArgs<ExtArgs>
            result: $Utils.Optional<PsychologistGroupByOutputType>[]
          }
          count: {
            args: Prisma.PsychologistCountArgs<ExtArgs>
            result: $Utils.Optional<PsychologistCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
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
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
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
    psychologist?: PsychologistOmit
    session?: SessionOmit
    sessionNote?: SessionNoteOmit
    auditLog?: AuditLogOmit
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
    sessionsAsPatient: number
    notesAsPatient: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessionsAsPatient?: boolean | UserCountOutputTypeCountSessionsAsPatientArgs
    notesAsPatient?: boolean | UserCountOutputTypeCountNotesAsPatientArgs
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
  export type UserCountOutputTypeCountSessionsAsPatientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotesAsPatientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionNoteWhereInput
  }


  /**
   * Count Type PsychologistCountOutputType
   */

  export type PsychologistCountOutputType = {
    sessions: number
    notes: number
  }

  export type PsychologistCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | PsychologistCountOutputTypeCountSessionsArgs
    notes?: boolean | PsychologistCountOutputTypeCountNotesArgs
  }

  // Custom InputTypes
  /**
   * PsychologistCountOutputType without action
   */
  export type PsychologistCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PsychologistCountOutputType
     */
    select?: PsychologistCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PsychologistCountOutputType without action
   */
  export type PsychologistCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * PsychologistCountOutputType without action
   */
  export type PsychologistCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    fullName: string | null
    phone: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    fullName: string | null
    phone: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    fullName: number
    phone: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    phone?: true
    role?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    fullName: string
    phone: string | null
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    fullName?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    psychologist?: boolean | User$psychologistArgs<ExtArgs>
    sessionsAsPatient?: boolean | User$sessionsAsPatientArgs<ExtArgs>
    notesAsPatient?: boolean | User$notesAsPatientArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    fullName?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "fullName" | "phone" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | User$psychologistArgs<ExtArgs>
    sessionsAsPatient?: boolean | User$sessionsAsPatientArgs<ExtArgs>
    notesAsPatient?: boolean | User$notesAsPatientArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      psychologist: Prisma.$PsychologistPayload<ExtArgs> | null
      sessionsAsPatient: Prisma.$SessionPayload<ExtArgs>[]
      notesAsPatient: Prisma.$SessionNotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      fullName: string
      phone: string | null
      role: $Enums.Role
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
    psychologist<T extends User$psychologistArgs<ExtArgs> = {}>(args?: Subset<T, User$psychologistArgs<ExtArgs>>): Prisma__PsychologistClient<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sessionsAsPatient<T extends User$sessionsAsPatientArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsAsPatientArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notesAsPatient<T extends User$notesAsPatientArgs<ExtArgs> = {}>(args?: Subset<T, User$notesAsPatientArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
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
   * User.psychologist
   */
  export type User$psychologistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Psychologist
     */
    select?: PsychologistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Psychologist
     */
    omit?: PsychologistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistInclude<ExtArgs> | null
    where?: PsychologistWhereInput
  }

  /**
   * User.sessionsAsPatient
   */
  export type User$sessionsAsPatientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.notesAsPatient
   */
  export type User$notesAsPatientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Model Psychologist
   */

  export type AggregatePsychologist = {
    _count: PsychologistCountAggregateOutputType | null
    _avg: PsychologistAvgAggregateOutputType | null
    _sum: PsychologistSumAggregateOutputType | null
    _min: PsychologistMinAggregateOutputType | null
    _max: PsychologistMaxAggregateOutputType | null
  }

  export type PsychologistAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type PsychologistSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type PsychologistMinAggregateOutputType = {
    id: number | null
    userId: number | null
    education: string | null
    experience: string | null
    therapyApproach: string | null
    photoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PsychologistMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    education: string | null
    experience: string | null
    therapyApproach: string | null
    photoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PsychologistCountAggregateOutputType = {
    id: number
    userId: number
    education: number
    experience: number
    therapyApproach: number
    photoUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PsychologistAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type PsychologistSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type PsychologistMinAggregateInputType = {
    id?: true
    userId?: true
    education?: true
    experience?: true
    therapyApproach?: true
    photoUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PsychologistMaxAggregateInputType = {
    id?: true
    userId?: true
    education?: true
    experience?: true
    therapyApproach?: true
    photoUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PsychologistCountAggregateInputType = {
    id?: true
    userId?: true
    education?: true
    experience?: true
    therapyApproach?: true
    photoUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PsychologistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Psychologist to aggregate.
     */
    where?: PsychologistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Psychologists to fetch.
     */
    orderBy?: PsychologistOrderByWithRelationInput | PsychologistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PsychologistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Psychologists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Psychologists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Psychologists
    **/
    _count?: true | PsychologistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PsychologistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PsychologistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PsychologistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PsychologistMaxAggregateInputType
  }

  export type GetPsychologistAggregateType<T extends PsychologistAggregateArgs> = {
        [P in keyof T & keyof AggregatePsychologist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePsychologist[P]>
      : GetScalarType<T[P], AggregatePsychologist[P]>
  }




  export type PsychologistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PsychologistWhereInput
    orderBy?: PsychologistOrderByWithAggregationInput | PsychologistOrderByWithAggregationInput[]
    by: PsychologistScalarFieldEnum[] | PsychologistScalarFieldEnum
    having?: PsychologistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PsychologistCountAggregateInputType | true
    _avg?: PsychologistAvgAggregateInputType
    _sum?: PsychologistSumAggregateInputType
    _min?: PsychologistMinAggregateInputType
    _max?: PsychologistMaxAggregateInputType
  }

  export type PsychologistGroupByOutputType = {
    id: number
    userId: number
    education: string | null
    experience: string | null
    therapyApproach: string | null
    photoUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: PsychologistCountAggregateOutputType | null
    _avg: PsychologistAvgAggregateOutputType | null
    _sum: PsychologistSumAggregateOutputType | null
    _min: PsychologistMinAggregateOutputType | null
    _max: PsychologistMaxAggregateOutputType | null
  }

  type GetPsychologistGroupByPayload<T extends PsychologistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PsychologistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PsychologistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PsychologistGroupByOutputType[P]>
            : GetScalarType<T[P], PsychologistGroupByOutputType[P]>
        }
      >
    >


  export type PsychologistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    education?: boolean
    experience?: boolean
    therapyApproach?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    sessions?: boolean | Psychologist$sessionsArgs<ExtArgs>
    notes?: boolean | Psychologist$notesArgs<ExtArgs>
    _count?: boolean | PsychologistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["psychologist"]>

  export type PsychologistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    education?: boolean
    experience?: boolean
    therapyApproach?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["psychologist"]>

  export type PsychologistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    education?: boolean
    experience?: boolean
    therapyApproach?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["psychologist"]>

  export type PsychologistSelectScalar = {
    id?: boolean
    userId?: boolean
    education?: boolean
    experience?: boolean
    therapyApproach?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PsychologistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "education" | "experience" | "therapyApproach" | "photoUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["psychologist"]>
  export type PsychologistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    sessions?: boolean | Psychologist$sessionsArgs<ExtArgs>
    notes?: boolean | Psychologist$notesArgs<ExtArgs>
    _count?: boolean | PsychologistCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PsychologistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PsychologistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PsychologistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Psychologist"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      notes: Prisma.$SessionNotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      education: string | null
      experience: string | null
      therapyApproach: string | null
      photoUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["psychologist"]>
    composites: {}
  }

  type PsychologistGetPayload<S extends boolean | null | undefined | PsychologistDefaultArgs> = $Result.GetResult<Prisma.$PsychologistPayload, S>

  type PsychologistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PsychologistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PsychologistCountAggregateInputType | true
    }

  export interface PsychologistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Psychologist'], meta: { name: 'Psychologist' } }
    /**
     * Find zero or one Psychologist that matches the filter.
     * @param {PsychologistFindUniqueArgs} args - Arguments to find a Psychologist
     * @example
     * // Get one Psychologist
     * const psychologist = await prisma.psychologist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PsychologistFindUniqueArgs>(args: SelectSubset<T, PsychologistFindUniqueArgs<ExtArgs>>): Prisma__PsychologistClient<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Psychologist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PsychologistFindUniqueOrThrowArgs} args - Arguments to find a Psychologist
     * @example
     * // Get one Psychologist
     * const psychologist = await prisma.psychologist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PsychologistFindUniqueOrThrowArgs>(args: SelectSubset<T, PsychologistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PsychologistClient<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Psychologist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistFindFirstArgs} args - Arguments to find a Psychologist
     * @example
     * // Get one Psychologist
     * const psychologist = await prisma.psychologist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PsychologistFindFirstArgs>(args?: SelectSubset<T, PsychologistFindFirstArgs<ExtArgs>>): Prisma__PsychologistClient<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Psychologist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistFindFirstOrThrowArgs} args - Arguments to find a Psychologist
     * @example
     * // Get one Psychologist
     * const psychologist = await prisma.psychologist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PsychologistFindFirstOrThrowArgs>(args?: SelectSubset<T, PsychologistFindFirstOrThrowArgs<ExtArgs>>): Prisma__PsychologistClient<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Psychologists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Psychologists
     * const psychologists = await prisma.psychologist.findMany()
     * 
     * // Get first 10 Psychologists
     * const psychologists = await prisma.psychologist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const psychologistWithIdOnly = await prisma.psychologist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PsychologistFindManyArgs>(args?: SelectSubset<T, PsychologistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Psychologist.
     * @param {PsychologistCreateArgs} args - Arguments to create a Psychologist.
     * @example
     * // Create one Psychologist
     * const Psychologist = await prisma.psychologist.create({
     *   data: {
     *     // ... data to create a Psychologist
     *   }
     * })
     * 
     */
    create<T extends PsychologistCreateArgs>(args: SelectSubset<T, PsychologistCreateArgs<ExtArgs>>): Prisma__PsychologistClient<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Psychologists.
     * @param {PsychologistCreateManyArgs} args - Arguments to create many Psychologists.
     * @example
     * // Create many Psychologists
     * const psychologist = await prisma.psychologist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PsychologistCreateManyArgs>(args?: SelectSubset<T, PsychologistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Psychologists and returns the data saved in the database.
     * @param {PsychologistCreateManyAndReturnArgs} args - Arguments to create many Psychologists.
     * @example
     * // Create many Psychologists
     * const psychologist = await prisma.psychologist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Psychologists and only return the `id`
     * const psychologistWithIdOnly = await prisma.psychologist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PsychologistCreateManyAndReturnArgs>(args?: SelectSubset<T, PsychologistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Psychologist.
     * @param {PsychologistDeleteArgs} args - Arguments to delete one Psychologist.
     * @example
     * // Delete one Psychologist
     * const Psychologist = await prisma.psychologist.delete({
     *   where: {
     *     // ... filter to delete one Psychologist
     *   }
     * })
     * 
     */
    delete<T extends PsychologistDeleteArgs>(args: SelectSubset<T, PsychologistDeleteArgs<ExtArgs>>): Prisma__PsychologistClient<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Psychologist.
     * @param {PsychologistUpdateArgs} args - Arguments to update one Psychologist.
     * @example
     * // Update one Psychologist
     * const psychologist = await prisma.psychologist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PsychologistUpdateArgs>(args: SelectSubset<T, PsychologistUpdateArgs<ExtArgs>>): Prisma__PsychologistClient<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Psychologists.
     * @param {PsychologistDeleteManyArgs} args - Arguments to filter Psychologists to delete.
     * @example
     * // Delete a few Psychologists
     * const { count } = await prisma.psychologist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PsychologistDeleteManyArgs>(args?: SelectSubset<T, PsychologistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Psychologists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Psychologists
     * const psychologist = await prisma.psychologist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PsychologistUpdateManyArgs>(args: SelectSubset<T, PsychologistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Psychologists and returns the data updated in the database.
     * @param {PsychologistUpdateManyAndReturnArgs} args - Arguments to update many Psychologists.
     * @example
     * // Update many Psychologists
     * const psychologist = await prisma.psychologist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Psychologists and only return the `id`
     * const psychologistWithIdOnly = await prisma.psychologist.updateManyAndReturn({
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
    updateManyAndReturn<T extends PsychologistUpdateManyAndReturnArgs>(args: SelectSubset<T, PsychologistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Psychologist.
     * @param {PsychologistUpsertArgs} args - Arguments to update or create a Psychologist.
     * @example
     * // Update or create a Psychologist
     * const psychologist = await prisma.psychologist.upsert({
     *   create: {
     *     // ... data to create a Psychologist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Psychologist we want to update
     *   }
     * })
     */
    upsert<T extends PsychologistUpsertArgs>(args: SelectSubset<T, PsychologistUpsertArgs<ExtArgs>>): Prisma__PsychologistClient<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Psychologists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistCountArgs} args - Arguments to filter Psychologists to count.
     * @example
     * // Count the number of Psychologists
     * const count = await prisma.psychologist.count({
     *   where: {
     *     // ... the filter for the Psychologists we want to count
     *   }
     * })
    **/
    count<T extends PsychologistCountArgs>(
      args?: Subset<T, PsychologistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PsychologistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Psychologist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PsychologistAggregateArgs>(args: Subset<T, PsychologistAggregateArgs>): Prisma.PrismaPromise<GetPsychologistAggregateType<T>>

    /**
     * Group by Psychologist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PsychologistGroupByArgs} args - Group by arguments.
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
      T extends PsychologistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PsychologistGroupByArgs['orderBy'] }
        : { orderBy?: PsychologistGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PsychologistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPsychologistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Psychologist model
   */
  readonly fields: PsychologistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Psychologist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PsychologistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sessions<T extends Psychologist$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Psychologist$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notes<T extends Psychologist$notesArgs<ExtArgs> = {}>(args?: Subset<T, Psychologist$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Psychologist model
   */
  interface PsychologistFieldRefs {
    readonly id: FieldRef<"Psychologist", 'Int'>
    readonly userId: FieldRef<"Psychologist", 'Int'>
    readonly education: FieldRef<"Psychologist", 'String'>
    readonly experience: FieldRef<"Psychologist", 'String'>
    readonly therapyApproach: FieldRef<"Psychologist", 'String'>
    readonly photoUrl: FieldRef<"Psychologist", 'String'>
    readonly createdAt: FieldRef<"Psychologist", 'DateTime'>
    readonly updatedAt: FieldRef<"Psychologist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Psychologist findUnique
   */
  export type PsychologistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Psychologist
     */
    select?: PsychologistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Psychologist
     */
    omit?: PsychologistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistInclude<ExtArgs> | null
    /**
     * Filter, which Psychologist to fetch.
     */
    where: PsychologistWhereUniqueInput
  }

  /**
   * Psychologist findUniqueOrThrow
   */
  export type PsychologistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Psychologist
     */
    select?: PsychologistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Psychologist
     */
    omit?: PsychologistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistInclude<ExtArgs> | null
    /**
     * Filter, which Psychologist to fetch.
     */
    where: PsychologistWhereUniqueInput
  }

  /**
   * Psychologist findFirst
   */
  export type PsychologistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Psychologist
     */
    select?: PsychologistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Psychologist
     */
    omit?: PsychologistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistInclude<ExtArgs> | null
    /**
     * Filter, which Psychologist to fetch.
     */
    where?: PsychologistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Psychologists to fetch.
     */
    orderBy?: PsychologistOrderByWithRelationInput | PsychologistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Psychologists.
     */
    cursor?: PsychologistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Psychologists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Psychologists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Psychologists.
     */
    distinct?: PsychologistScalarFieldEnum | PsychologistScalarFieldEnum[]
  }

  /**
   * Psychologist findFirstOrThrow
   */
  export type PsychologistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Psychologist
     */
    select?: PsychologistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Psychologist
     */
    omit?: PsychologistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistInclude<ExtArgs> | null
    /**
     * Filter, which Psychologist to fetch.
     */
    where?: PsychologistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Psychologists to fetch.
     */
    orderBy?: PsychologistOrderByWithRelationInput | PsychologistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Psychologists.
     */
    cursor?: PsychologistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Psychologists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Psychologists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Psychologists.
     */
    distinct?: PsychologistScalarFieldEnum | PsychologistScalarFieldEnum[]
  }

  /**
   * Psychologist findMany
   */
  export type PsychologistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Psychologist
     */
    select?: PsychologistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Psychologist
     */
    omit?: PsychologistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistInclude<ExtArgs> | null
    /**
     * Filter, which Psychologists to fetch.
     */
    where?: PsychologistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Psychologists to fetch.
     */
    orderBy?: PsychologistOrderByWithRelationInput | PsychologistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Psychologists.
     */
    cursor?: PsychologistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Psychologists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Psychologists.
     */
    skip?: number
    distinct?: PsychologistScalarFieldEnum | PsychologistScalarFieldEnum[]
  }

  /**
   * Psychologist create
   */
  export type PsychologistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Psychologist
     */
    select?: PsychologistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Psychologist
     */
    omit?: PsychologistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistInclude<ExtArgs> | null
    /**
     * The data needed to create a Psychologist.
     */
    data: XOR<PsychologistCreateInput, PsychologistUncheckedCreateInput>
  }

  /**
   * Psychologist createMany
   */
  export type PsychologistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Psychologists.
     */
    data: PsychologistCreateManyInput | PsychologistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Psychologist createManyAndReturn
   */
  export type PsychologistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Psychologist
     */
    select?: PsychologistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Psychologist
     */
    omit?: PsychologistOmit<ExtArgs> | null
    /**
     * The data used to create many Psychologists.
     */
    data: PsychologistCreateManyInput | PsychologistCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Psychologist update
   */
  export type PsychologistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Psychologist
     */
    select?: PsychologistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Psychologist
     */
    omit?: PsychologistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistInclude<ExtArgs> | null
    /**
     * The data needed to update a Psychologist.
     */
    data: XOR<PsychologistUpdateInput, PsychologistUncheckedUpdateInput>
    /**
     * Choose, which Psychologist to update.
     */
    where: PsychologistWhereUniqueInput
  }

  /**
   * Psychologist updateMany
   */
  export type PsychologistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Psychologists.
     */
    data: XOR<PsychologistUpdateManyMutationInput, PsychologistUncheckedUpdateManyInput>
    /**
     * Filter which Psychologists to update
     */
    where?: PsychologistWhereInput
    /**
     * Limit how many Psychologists to update.
     */
    limit?: number
  }

  /**
   * Psychologist updateManyAndReturn
   */
  export type PsychologistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Psychologist
     */
    select?: PsychologistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Psychologist
     */
    omit?: PsychologistOmit<ExtArgs> | null
    /**
     * The data used to update Psychologists.
     */
    data: XOR<PsychologistUpdateManyMutationInput, PsychologistUncheckedUpdateManyInput>
    /**
     * Filter which Psychologists to update
     */
    where?: PsychologistWhereInput
    /**
     * Limit how many Psychologists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Psychologist upsert
   */
  export type PsychologistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Psychologist
     */
    select?: PsychologistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Psychologist
     */
    omit?: PsychologistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistInclude<ExtArgs> | null
    /**
     * The filter to search for the Psychologist to update in case it exists.
     */
    where: PsychologistWhereUniqueInput
    /**
     * In case the Psychologist found by the `where` argument doesn't exist, create a new Psychologist with this data.
     */
    create: XOR<PsychologistCreateInput, PsychologistUncheckedCreateInput>
    /**
     * In case the Psychologist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PsychologistUpdateInput, PsychologistUncheckedUpdateInput>
  }

  /**
   * Psychologist delete
   */
  export type PsychologistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Psychologist
     */
    select?: PsychologistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Psychologist
     */
    omit?: PsychologistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistInclude<ExtArgs> | null
    /**
     * Filter which Psychologist to delete.
     */
    where: PsychologistWhereUniqueInput
  }

  /**
   * Psychologist deleteMany
   */
  export type PsychologistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Psychologists to delete
     */
    where?: PsychologistWhereInput
    /**
     * Limit how many Psychologists to delete.
     */
    limit?: number
  }

  /**
   * Psychologist.sessions
   */
  export type Psychologist$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Psychologist.notes
   */
  export type Psychologist$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Psychologist without action
   */
  export type PsychologistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Psychologist
     */
    select?: PsychologistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Psychologist
     */
    omit?: PsychologistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PsychologistInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    id: number | null
    psychologistId: number | null
    patientId: number | null
  }

  export type SessionSumAggregateOutputType = {
    id: number | null
    psychologistId: number | null
    patientId: number | null
  }

  export type SessionMinAggregateOutputType = {
    id: number | null
    psychologistId: number | null
    patientId: number | null
    date: Date | null
    startTime: string | null
    endTime: string | null
    status: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: number | null
    psychologistId: number | null
    patientId: number | null
    date: Date | null
    startTime: string | null
    endTime: string | null
    status: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    psychologistId: number
    patientId: number
    date: number
    startTime: number
    endTime: number
    status: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    id?: true
    psychologistId?: true
    patientId?: true
  }

  export type SessionSumAggregateInputType = {
    id?: true
    psychologistId?: true
    patientId?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    psychologistId?: true
    patientId?: true
    date?: true
    startTime?: true
    endTime?: true
    status?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    psychologistId?: true
    patientId?: true
    date?: true
    startTime?: true
    endTime?: true
    status?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    psychologistId?: true
    patientId?: true
    date?: true
    startTime?: true
    endTime?: true
    status?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: number
    psychologistId: number
    patientId: number
    date: Date
    startTime: string | null
    endTime: string | null
    status: string
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    patientId?: boolean
    date?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    psychologist?: boolean | PsychologistDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
    note?: boolean | Session$noteArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    patientId?: boolean
    date?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    psychologist?: boolean | PsychologistDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    psychologistId?: boolean
    patientId?: boolean
    date?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    psychologist?: boolean | PsychologistDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    psychologistId?: boolean
    patientId?: boolean
    date?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "psychologistId" | "patientId" | "date" | "startTime" | "endTime" | "status" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
    note?: boolean | Session$noteArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    psychologist?: boolean | PsychologistDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      psychologist: Prisma.$PsychologistPayload<ExtArgs>
      patient: Prisma.$UserPayload<ExtArgs>
      note: Prisma.$SessionNotePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      psychologistId: number
      patientId: number
      date: Date
      startTime: string | null
      endTime: string | null
      status: string
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
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
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    psychologist<T extends PsychologistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistDefaultArgs<ExtArgs>>): Prisma__PsychologistClient<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    patient<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    note<T extends Session$noteArgs<ExtArgs> = {}>(args?: Subset<T, Session$noteArgs<ExtArgs>>): Prisma__SessionNoteClient<$Result.GetResult<Prisma.$SessionNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'Int'>
    readonly psychologistId: FieldRef<"Session", 'Int'>
    readonly patientId: FieldRef<"Session", 'Int'>
    readonly date: FieldRef<"Session", 'DateTime'>
    readonly startTime: FieldRef<"Session", 'String'>
    readonly endTime: FieldRef<"Session", 'String'>
    readonly status: FieldRef<"Session", 'String'>
    readonly deletedAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session.note
   */
  export type Session$noteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model SessionNote
   */

  export type AggregateSessionNote = {
    _count: SessionNoteCountAggregateOutputType | null
    _avg: SessionNoteAvgAggregateOutputType | null
    _sum: SessionNoteSumAggregateOutputType | null
    _min: SessionNoteMinAggregateOutputType | null
    _max: SessionNoteMaxAggregateOutputType | null
  }

  export type SessionNoteAvgAggregateOutputType = {
    id: number | null
    sessionId: number | null
    psychologistId: number | null
    patientId: number | null
  }

  export type SessionNoteSumAggregateOutputType = {
    id: number | null
    sessionId: number | null
    psychologistId: number | null
    patientId: number | null
  }

  export type SessionNoteMinAggregateOutputType = {
    id: number | null
    sessionId: number | null
    psychologistId: number | null
    patientId: number | null
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
    id: number | null
    sessionId: number | null
    psychologistId: number | null
    patientId: number | null
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
    sessionId: number
    psychologistId: number
    patientId: number
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


  export type SessionNoteAvgAggregateInputType = {
    id?: true
    sessionId?: true
    psychologistId?: true
    patientId?: true
  }

  export type SessionNoteSumAggregateInputType = {
    id?: true
    sessionId?: true
    psychologistId?: true
    patientId?: true
  }

  export type SessionNoteMinAggregateInputType = {
    id?: true
    sessionId?: true
    psychologistId?: true
    patientId?: true
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
    sessionId?: true
    psychologistId?: true
    patientId?: true
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
    sessionId?: true
    psychologistId?: true
    patientId?: true
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
     * Select which fields to average
    **/
    _avg?: SessionNoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionNoteSumAggregateInputType
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
    _avg?: SessionNoteAvgAggregateInputType
    _sum?: SessionNoteSumAggregateInputType
    _min?: SessionNoteMinAggregateInputType
    _max?: SessionNoteMaxAggregateInputType
  }

  export type SessionNoteGroupByOutputType = {
    id: number
    sessionId: number
    psychologistId: number
    patientId: number
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
    _avg: SessionNoteAvgAggregateOutputType | null
    _sum: SessionNoteSumAggregateOutputType | null
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
    sessionId?: boolean
    psychologistId?: boolean
    patientId?: boolean
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
    session?: boolean | SessionDefaultArgs<ExtArgs>
    psychologist?: boolean | PsychologistDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionNote"]>

  export type SessionNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    psychologistId?: boolean
    patientId?: boolean
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
    session?: boolean | SessionDefaultArgs<ExtArgs>
    psychologist?: boolean | PsychologistDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionNote"]>

  export type SessionNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    psychologistId?: boolean
    patientId?: boolean
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
    session?: boolean | SessionDefaultArgs<ExtArgs>
    psychologist?: boolean | PsychologistDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionNote"]>

  export type SessionNoteSelectScalar = {
    id?: boolean
    sessionId?: boolean
    psychologistId?: boolean
    patientId?: boolean
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

  export type SessionNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "psychologistId" | "patientId" | "subjective" | "objective" | "assessment" | "plan" | "riskLevel" | "followUpDate" | "nextSessionRecommendation" | "tags" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["sessionNote"]>
  export type SessionNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
    psychologist?: boolean | PsychologistDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
    psychologist?: boolean | PsychologistDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
    psychologist?: boolean | PsychologistDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SessionNote"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs>
      psychologist: Prisma.$PsychologistPayload<ExtArgs>
      patient: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sessionId: number
      psychologistId: number
      patientId: number
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
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    psychologist<T extends PsychologistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PsychologistDefaultArgs<ExtArgs>>): Prisma__PsychologistClient<$Result.GetResult<Prisma.$PsychologistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    patient<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly id: FieldRef<"SessionNote", 'Int'>
    readonly sessionId: FieldRef<"SessionNote", 'Int'>
    readonly psychologistId: FieldRef<"SessionNote", 'Int'>
    readonly patientId: FieldRef<"SessionNote", 'Int'>
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
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogAvgAggregateOutputType = {
    id: number | null
    actorUserId: number | null
    entityId: number | null
  }

  export type AuditLogSumAggregateOutputType = {
    id: number | null
    actorUserId: number | null
    entityId: number | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: number | null
    actorUserId: number | null
    actorRole: $Enums.Role | null
    action: string | null
    entity: string | null
    entityId: number | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: number | null
    actorUserId: number | null
    actorRole: $Enums.Role | null
    action: string | null
    entity: string | null
    entityId: number | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    actorUserId: number
    actorRole: number
    action: number
    entity: number
    entityId: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AuditLogAvgAggregateInputType = {
    id?: true
    actorUserId?: true
    entityId?: true
  }

  export type AuditLogSumAggregateInputType = {
    id?: true
    actorUserId?: true
    entityId?: true
  }

  export type AuditLogMinAggregateInputType = {
    id?: true
    actorUserId?: true
    actorRole?: true
    action?: true
    entity?: true
    entityId?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    actorUserId?: true
    actorRole?: true
    action?: true
    entity?: true
    entityId?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    actorUserId?: true
    actorRole?: true
    action?: true
    entity?: true
    entityId?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _avg?: AuditLogAvgAggregateInputType
    _sum?: AuditLogSumAggregateInputType
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: number
    actorUserId: number
    actorRole: $Enums.Role
    action: string
    entity: string
    entityId: number
    metadata: JsonValue | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorUserId?: boolean
    actorRole?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorUserId?: boolean
    actorRole?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorUserId?: boolean
    actorRole?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    actorUserId?: boolean
    actorRole?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "actorUserId" | "actorRole" | "action" | "entity" | "entityId" | "metadata" | "createdAt", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      actorUserId: number
      actorRole: $Enums.Role
      action: string
      entity: string
      entityId: number
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'Int'>
    readonly actorUserId: FieldRef<"AuditLog", 'Int'>
    readonly actorRole: FieldRef<"AuditLog", 'Role'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entity: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'Int'>
    readonly metadata: FieldRef<"AuditLog", 'Json'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
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
    fullName: 'fullName',
    phone: 'phone',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PsychologistScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    education: 'education',
    experience: 'experience',
    therapyApproach: 'therapyApproach',
    photoUrl: 'photoUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PsychologistScalarFieldEnum = (typeof PsychologistScalarFieldEnum)[keyof typeof PsychologistScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    psychologistId: 'psychologistId',
    patientId: 'patientId',
    date: 'date',
    startTime: 'startTime',
    endTime: 'endTime',
    status: 'status',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SessionNoteScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    psychologistId: 'psychologistId',
    patientId: 'patientId',
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


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    actorUserId: 'actorUserId',
    actorRole: 'actorRole',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'RiskLevel'
   */
  export type EnumRiskLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskLevel'>
    


  /**
   * Reference to a field of type 'RiskLevel[]'
   */
  export type ListEnumRiskLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskLevel[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


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
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    psychologist?: XOR<PsychologistNullableScalarRelationFilter, PsychologistWhereInput> | null
    sessionsAsPatient?: SessionListRelationFilter
    notesAsPatient?: SessionNoteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    psychologist?: PsychologistOrderByWithRelationInput
    sessionsAsPatient?: SessionOrderByRelationAggregateInput
    notesAsPatient?: SessionNoteOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    psychologist?: XOR<PsychologistNullableScalarRelationFilter, PsychologistWhereInput> | null
    sessionsAsPatient?: SessionListRelationFilter
    notesAsPatient?: SessionNoteListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PsychologistWhereInput = {
    AND?: PsychologistWhereInput | PsychologistWhereInput[]
    OR?: PsychologistWhereInput[]
    NOT?: PsychologistWhereInput | PsychologistWhereInput[]
    id?: IntFilter<"Psychologist"> | number
    userId?: IntFilter<"Psychologist"> | number
    education?: StringNullableFilter<"Psychologist"> | string | null
    experience?: StringNullableFilter<"Psychologist"> | string | null
    therapyApproach?: StringNullableFilter<"Psychologist"> | string | null
    photoUrl?: StringNullableFilter<"Psychologist"> | string | null
    createdAt?: DateTimeFilter<"Psychologist"> | Date | string
    updatedAt?: DateTimeFilter<"Psychologist"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sessions?: SessionListRelationFilter
    notes?: SessionNoteListRelationFilter
  }

  export type PsychologistOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    education?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    therapyApproach?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    sessions?: SessionOrderByRelationAggregateInput
    notes?: SessionNoteOrderByRelationAggregateInput
  }

  export type PsychologistWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: PsychologistWhereInput | PsychologistWhereInput[]
    OR?: PsychologistWhereInput[]
    NOT?: PsychologistWhereInput | PsychologistWhereInput[]
    education?: StringNullableFilter<"Psychologist"> | string | null
    experience?: StringNullableFilter<"Psychologist"> | string | null
    therapyApproach?: StringNullableFilter<"Psychologist"> | string | null
    photoUrl?: StringNullableFilter<"Psychologist"> | string | null
    createdAt?: DateTimeFilter<"Psychologist"> | Date | string
    updatedAt?: DateTimeFilter<"Psychologist"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sessions?: SessionListRelationFilter
    notes?: SessionNoteListRelationFilter
  }, "id" | "userId">

  export type PsychologistOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    education?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    therapyApproach?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PsychologistCountOrderByAggregateInput
    _avg?: PsychologistAvgOrderByAggregateInput
    _max?: PsychologistMaxOrderByAggregateInput
    _min?: PsychologistMinOrderByAggregateInput
    _sum?: PsychologistSumOrderByAggregateInput
  }

  export type PsychologistScalarWhereWithAggregatesInput = {
    AND?: PsychologistScalarWhereWithAggregatesInput | PsychologistScalarWhereWithAggregatesInput[]
    OR?: PsychologistScalarWhereWithAggregatesInput[]
    NOT?: PsychologistScalarWhereWithAggregatesInput | PsychologistScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Psychologist"> | number
    userId?: IntWithAggregatesFilter<"Psychologist"> | number
    education?: StringNullableWithAggregatesFilter<"Psychologist"> | string | null
    experience?: StringNullableWithAggregatesFilter<"Psychologist"> | string | null
    therapyApproach?: StringNullableWithAggregatesFilter<"Psychologist"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"Psychologist"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Psychologist"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Psychologist"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: IntFilter<"Session"> | number
    psychologistId?: IntFilter<"Session"> | number
    patientId?: IntFilter<"Session"> | number
    date?: DateTimeFilter<"Session"> | Date | string
    startTime?: StringNullableFilter<"Session"> | string | null
    endTime?: StringNullableFilter<"Session"> | string | null
    status?: StringFilter<"Session"> | string
    deletedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    psychologist?: XOR<PsychologistScalarRelationFilter, PsychologistWhereInput>
    patient?: XOR<UserScalarRelationFilter, UserWhereInput>
    note?: XOR<SessionNoteNullableScalarRelationFilter, SessionNoteWhereInput> | null
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
    date?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    status?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    psychologist?: PsychologistOrderByWithRelationInput
    patient?: UserOrderByWithRelationInput
    note?: SessionNoteOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    psychologistId?: IntFilter<"Session"> | number
    patientId?: IntFilter<"Session"> | number
    date?: DateTimeFilter<"Session"> | Date | string
    startTime?: StringNullableFilter<"Session"> | string | null
    endTime?: StringNullableFilter<"Session"> | string | null
    status?: StringFilter<"Session"> | string
    deletedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    psychologist?: XOR<PsychologistScalarRelationFilter, PsychologistWhereInput>
    patient?: XOR<UserScalarRelationFilter, UserWhereInput>
    note?: XOR<SessionNoteNullableScalarRelationFilter, SessionNoteWhereInput> | null
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
    date?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    status?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Session"> | number
    psychologistId?: IntWithAggregatesFilter<"Session"> | number
    patientId?: IntWithAggregatesFilter<"Session"> | number
    date?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    startTime?: StringNullableWithAggregatesFilter<"Session"> | string | null
    endTime?: StringNullableWithAggregatesFilter<"Session"> | string | null
    status?: StringWithAggregatesFilter<"Session"> | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type SessionNoteWhereInput = {
    AND?: SessionNoteWhereInput | SessionNoteWhereInput[]
    OR?: SessionNoteWhereInput[]
    NOT?: SessionNoteWhereInput | SessionNoteWhereInput[]
    id?: IntFilter<"SessionNote"> | number
    sessionId?: IntFilter<"SessionNote"> | number
    psychologistId?: IntFilter<"SessionNote"> | number
    patientId?: IntFilter<"SessionNote"> | number
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
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
    psychologist?: XOR<PsychologistScalarRelationFilter, PsychologistWhereInput>
    patient?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionNoteOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
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
    session?: SessionOrderByWithRelationInput
    psychologist?: PsychologistOrderByWithRelationInput
    patient?: UserOrderByWithRelationInput
  }

  export type SessionNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    sessionId?: number
    AND?: SessionNoteWhereInput | SessionNoteWhereInput[]
    OR?: SessionNoteWhereInput[]
    NOT?: SessionNoteWhereInput | SessionNoteWhereInput[]
    psychologistId?: IntFilter<"SessionNote"> | number
    patientId?: IntFilter<"SessionNote"> | number
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
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
    psychologist?: XOR<PsychologistScalarRelationFilter, PsychologistWhereInput>
    patient?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionId">

  export type SessionNoteOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
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
    _avg?: SessionNoteAvgOrderByAggregateInput
    _max?: SessionNoteMaxOrderByAggregateInput
    _min?: SessionNoteMinOrderByAggregateInput
    _sum?: SessionNoteSumOrderByAggregateInput
  }

  export type SessionNoteScalarWhereWithAggregatesInput = {
    AND?: SessionNoteScalarWhereWithAggregatesInput | SessionNoteScalarWhereWithAggregatesInput[]
    OR?: SessionNoteScalarWhereWithAggregatesInput[]
    NOT?: SessionNoteScalarWhereWithAggregatesInput | SessionNoteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SessionNote"> | number
    sessionId?: IntWithAggregatesFilter<"SessionNote"> | number
    psychologistId?: IntWithAggregatesFilter<"SessionNote"> | number
    patientId?: IntWithAggregatesFilter<"SessionNote"> | number
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

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    actorUserId?: IntFilter<"AuditLog"> | number
    actorRole?: EnumRoleFilter<"AuditLog"> | $Enums.Role
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: IntFilter<"AuditLog"> | number
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    actorUserId?: SortOrder
    actorRole?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    actorUserId?: IntFilter<"AuditLog"> | number
    actorRole?: EnumRoleFilter<"AuditLog"> | $Enums.Role
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: IntFilter<"AuditLog"> | number
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    actorUserId?: SortOrder
    actorRole?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _avg?: AuditLogAvgOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
    _sum?: AuditLogSumOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AuditLog"> | number
    actorUserId?: IntWithAggregatesFilter<"AuditLog"> | number
    actorRole?: EnumRoleWithAggregatesFilter<"AuditLog"> | $Enums.Role
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entity?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: IntWithAggregatesFilter<"AuditLog"> | number
    metadata?: JsonNullableWithAggregatesFilter<"AuditLog">
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    fullName: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    psychologist?: PsychologistCreateNestedOneWithoutUserInput
    sessionsAsPatient?: SessionCreateNestedManyWithoutPatientInput
    notesAsPatient?: SessionNoteCreateNestedManyWithoutPatientInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    fullName: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    psychologist?: PsychologistUncheckedCreateNestedOneWithoutUserInput
    sessionsAsPatient?: SessionUncheckedCreateNestedManyWithoutPatientInput
    notesAsPatient?: SessionNoteUncheckedCreateNestedManyWithoutPatientInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistUpdateOneWithoutUserNestedInput
    sessionsAsPatient?: SessionUpdateManyWithoutPatientNestedInput
    notesAsPatient?: SessionNoteUpdateManyWithoutPatientNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistUncheckedUpdateOneWithoutUserNestedInput
    sessionsAsPatient?: SessionUncheckedUpdateManyWithoutPatientNestedInput
    notesAsPatient?: SessionNoteUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    fullName: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PsychologistCreateInput = {
    education?: string | null
    experience?: string | null
    therapyApproach?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPsychologistInput
    sessions?: SessionCreateNestedManyWithoutPsychologistInput
    notes?: SessionNoteCreateNestedManyWithoutPsychologistInput
  }

  export type PsychologistUncheckedCreateInput = {
    id?: number
    userId: number
    education?: string | null
    experience?: string | null
    therapyApproach?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutPsychologistInput
    notes?: SessionNoteUncheckedCreateNestedManyWithoutPsychologistInput
  }

  export type PsychologistUpdateInput = {
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    therapyApproach?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPsychologistNestedInput
    sessions?: SessionUpdateManyWithoutPsychologistNestedInput
    notes?: SessionNoteUpdateManyWithoutPsychologistNestedInput
  }

  export type PsychologistUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    therapyApproach?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutPsychologistNestedInput
    notes?: SessionNoteUncheckedUpdateManyWithoutPsychologistNestedInput
  }

  export type PsychologistCreateManyInput = {
    id?: number
    userId: number
    education?: string | null
    experience?: string | null
    therapyApproach?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PsychologistUpdateManyMutationInput = {
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    therapyApproach?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PsychologistUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    therapyApproach?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    date: Date | string
    startTime?: string | null
    endTime?: string | null
    status?: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    psychologist: PsychologistCreateNestedOneWithoutSessionsInput
    patient: UserCreateNestedOneWithoutSessionsAsPatientInput
    note?: SessionNoteCreateNestedOneWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    id?: number
    psychologistId: number
    patientId: number
    date: Date | string
    startTime?: string | null
    endTime?: string | null
    status?: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    note?: SessionNoteUncheckedCreateNestedOneWithoutSessionInput
  }

  export type SessionUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistUpdateOneRequiredWithoutSessionsNestedInput
    patient?: UserUpdateOneRequiredWithoutSessionsAsPatientNestedInput
    note?: SessionNoteUpdateOneWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    psychologistId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: SessionNoteUncheckedUpdateOneWithoutSessionNestedInput
  }

  export type SessionCreateManyInput = {
    id?: number
    psychologistId: number
    patientId: number
    date: Date | string
    startTime?: string | null
    endTime?: string | null
    status?: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    psychologistId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionNoteCreateInput = {
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
    session: SessionCreateNestedOneWithoutNoteInput
    psychologist: PsychologistCreateNestedOneWithoutNotesInput
    patient: UserCreateNestedOneWithoutNotesAsPatientInput
  }

  export type SessionNoteUncheckedCreateInput = {
    id?: number
    sessionId: number
    psychologistId: number
    patientId: number
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
    session?: SessionUpdateOneRequiredWithoutNoteNestedInput
    psychologist?: PsychologistUpdateOneRequiredWithoutNotesNestedInput
    patient?: UserUpdateOneRequiredWithoutNotesAsPatientNestedInput
  }

  export type SessionNoteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    psychologistId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
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
    id?: number
    sessionId: number
    psychologistId: number
    patientId: number
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
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    psychologistId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
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

  export type AuditLogCreateInput = {
    actorUserId: number
    actorRole: $Enums.Role
    action: string
    entity: string
    entityId: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: number
    actorUserId: number
    actorRole: $Enums.Role
    action: string
    entity: string
    entityId: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    actorUserId?: IntFieldUpdateOperationsInput | number
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    actorUserId?: IntFieldUpdateOperationsInput | number
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: number
    actorUserId: number
    actorRole: $Enums.Role
    action: string
    entity: string
    entityId: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    actorUserId?: IntFieldUpdateOperationsInput | number
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    actorUserId?: IntFieldUpdateOperationsInput | number
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type PsychologistNullableScalarRelationFilter = {
    is?: PsychologistWhereInput | null
    isNot?: PsychologistWhereInput | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SessionNoteListRelationFilter = {
    every?: SessionNoteWhereInput
    some?: SessionNoteWhereInput
    none?: SessionNoteWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PsychologistCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    education?: SortOrder
    experience?: SortOrder
    therapyApproach?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PsychologistAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type PsychologistMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    education?: SortOrder
    experience?: SortOrder
    therapyApproach?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PsychologistMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    education?: SortOrder
    experience?: SortOrder
    therapyApproach?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PsychologistSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
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

  export type PsychologistScalarRelationFilter = {
    is?: PsychologistWhereInput
    isNot?: PsychologistWhereInput
  }

  export type SessionNoteNullableScalarRelationFilter = {
    is?: SessionNoteWhereInput | null
    isNot?: SessionNoteWhereInput | null
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    id?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
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

  export type SessionScalarRelationFilter = {
    is?: SessionWhereInput
    isNot?: SessionWhereInput
  }

  export type SessionNoteCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
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

  export type SessionNoteAvgOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
  }

  export type SessionNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
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
    sessionId?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
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

  export type SessionNoteSumOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    psychologistId?: SortOrder
    patientId?: SortOrder
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
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    actorUserId?: SortOrder
    actorRole?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
    actorUserId?: SortOrder
    entityId?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    actorUserId?: SortOrder
    actorRole?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    actorUserId?: SortOrder
    actorRole?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogSumOrderByAggregateInput = {
    id?: SortOrder
    actorUserId?: SortOrder
    entityId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type PsychologistCreateNestedOneWithoutUserInput = {
    create?: XOR<PsychologistCreateWithoutUserInput, PsychologistUncheckedCreateWithoutUserInput>
    connectOrCreate?: PsychologistCreateOrConnectWithoutUserInput
    connect?: PsychologistWhereUniqueInput
  }

  export type SessionCreateNestedManyWithoutPatientInput = {
    create?: XOR<SessionCreateWithoutPatientInput, SessionUncheckedCreateWithoutPatientInput> | SessionCreateWithoutPatientInput[] | SessionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutPatientInput | SessionCreateOrConnectWithoutPatientInput[]
    createMany?: SessionCreateManyPatientInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionNoteCreateNestedManyWithoutPatientInput = {
    create?: XOR<SessionNoteCreateWithoutPatientInput, SessionNoteUncheckedCreateWithoutPatientInput> | SessionNoteCreateWithoutPatientInput[] | SessionNoteUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutPatientInput | SessionNoteCreateOrConnectWithoutPatientInput[]
    createMany?: SessionNoteCreateManyPatientInputEnvelope
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
  }

  export type PsychologistUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PsychologistCreateWithoutUserInput, PsychologistUncheckedCreateWithoutUserInput>
    connectOrCreate?: PsychologistCreateOrConnectWithoutUserInput
    connect?: PsychologistWhereUniqueInput
  }

  export type SessionUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<SessionCreateWithoutPatientInput, SessionUncheckedCreateWithoutPatientInput> | SessionCreateWithoutPatientInput[] | SessionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutPatientInput | SessionCreateOrConnectWithoutPatientInput[]
    createMany?: SessionCreateManyPatientInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionNoteUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<SessionNoteCreateWithoutPatientInput, SessionNoteUncheckedCreateWithoutPatientInput> | SessionNoteCreateWithoutPatientInput[] | SessionNoteUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutPatientInput | SessionNoteCreateOrConnectWithoutPatientInput[]
    createMany?: SessionNoteCreateManyPatientInputEnvelope
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PsychologistUpdateOneWithoutUserNestedInput = {
    create?: XOR<PsychologistCreateWithoutUserInput, PsychologistUncheckedCreateWithoutUserInput>
    connectOrCreate?: PsychologistCreateOrConnectWithoutUserInput
    upsert?: PsychologistUpsertWithoutUserInput
    disconnect?: PsychologistWhereInput | boolean
    delete?: PsychologistWhereInput | boolean
    connect?: PsychologistWhereUniqueInput
    update?: XOR<XOR<PsychologistUpdateToOneWithWhereWithoutUserInput, PsychologistUpdateWithoutUserInput>, PsychologistUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithoutPatientNestedInput = {
    create?: XOR<SessionCreateWithoutPatientInput, SessionUncheckedCreateWithoutPatientInput> | SessionCreateWithoutPatientInput[] | SessionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutPatientInput | SessionCreateOrConnectWithoutPatientInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutPatientInput | SessionUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: SessionCreateManyPatientInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutPatientInput | SessionUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutPatientInput | SessionUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionNoteUpdateManyWithoutPatientNestedInput = {
    create?: XOR<SessionNoteCreateWithoutPatientInput, SessionNoteUncheckedCreateWithoutPatientInput> | SessionNoteCreateWithoutPatientInput[] | SessionNoteUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutPatientInput | SessionNoteCreateOrConnectWithoutPatientInput[]
    upsert?: SessionNoteUpsertWithWhereUniqueWithoutPatientInput | SessionNoteUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: SessionNoteCreateManyPatientInputEnvelope
    set?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    disconnect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    delete?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    update?: SessionNoteUpdateWithWhereUniqueWithoutPatientInput | SessionNoteUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: SessionNoteUpdateManyWithWhereWithoutPatientInput | SessionNoteUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: SessionNoteScalarWhereInput | SessionNoteScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PsychologistUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PsychologistCreateWithoutUserInput, PsychologistUncheckedCreateWithoutUserInput>
    connectOrCreate?: PsychologistCreateOrConnectWithoutUserInput
    upsert?: PsychologistUpsertWithoutUserInput
    disconnect?: PsychologistWhereInput | boolean
    delete?: PsychologistWhereInput | boolean
    connect?: PsychologistWhereUniqueInput
    update?: XOR<XOR<PsychologistUpdateToOneWithWhereWithoutUserInput, PsychologistUpdateWithoutUserInput>, PsychologistUncheckedUpdateWithoutUserInput>
  }

  export type SessionUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<SessionCreateWithoutPatientInput, SessionUncheckedCreateWithoutPatientInput> | SessionCreateWithoutPatientInput[] | SessionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutPatientInput | SessionCreateOrConnectWithoutPatientInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutPatientInput | SessionUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: SessionCreateManyPatientInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutPatientInput | SessionUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutPatientInput | SessionUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionNoteUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<SessionNoteCreateWithoutPatientInput, SessionNoteUncheckedCreateWithoutPatientInput> | SessionNoteCreateWithoutPatientInput[] | SessionNoteUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutPatientInput | SessionNoteCreateOrConnectWithoutPatientInput[]
    upsert?: SessionNoteUpsertWithWhereUniqueWithoutPatientInput | SessionNoteUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: SessionNoteCreateManyPatientInputEnvelope
    set?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    disconnect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    delete?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    update?: SessionNoteUpdateWithWhereUniqueWithoutPatientInput | SessionNoteUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: SessionNoteUpdateManyWithWhereWithoutPatientInput | SessionNoteUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: SessionNoteScalarWhereInput | SessionNoteScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPsychologistInput = {
    create?: XOR<UserCreateWithoutPsychologistInput, UserUncheckedCreateWithoutPsychologistInput>
    connectOrCreate?: UserCreateOrConnectWithoutPsychologistInput
    connect?: UserWhereUniqueInput
  }

  export type SessionCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<SessionCreateWithoutPsychologistInput, SessionUncheckedCreateWithoutPsychologistInput> | SessionCreateWithoutPsychologistInput[] | SessionUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutPsychologistInput | SessionCreateOrConnectWithoutPsychologistInput[]
    createMany?: SessionCreateManyPsychologistInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionNoteCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<SessionNoteCreateWithoutPsychologistInput, SessionNoteUncheckedCreateWithoutPsychologistInput> | SessionNoteCreateWithoutPsychologistInput[] | SessionNoteUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutPsychologistInput | SessionNoteCreateOrConnectWithoutPsychologistInput[]
    createMany?: SessionNoteCreateManyPsychologistInputEnvelope
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<SessionCreateWithoutPsychologistInput, SessionUncheckedCreateWithoutPsychologistInput> | SessionCreateWithoutPsychologistInput[] | SessionUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutPsychologistInput | SessionCreateOrConnectWithoutPsychologistInput[]
    createMany?: SessionCreateManyPsychologistInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionNoteUncheckedCreateNestedManyWithoutPsychologistInput = {
    create?: XOR<SessionNoteCreateWithoutPsychologistInput, SessionNoteUncheckedCreateWithoutPsychologistInput> | SessionNoteCreateWithoutPsychologistInput[] | SessionNoteUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutPsychologistInput | SessionNoteCreateOrConnectWithoutPsychologistInput[]
    createMany?: SessionNoteCreateManyPsychologistInputEnvelope
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPsychologistNestedInput = {
    create?: XOR<UserCreateWithoutPsychologistInput, UserUncheckedCreateWithoutPsychologistInput>
    connectOrCreate?: UserCreateOrConnectWithoutPsychologistInput
    upsert?: UserUpsertWithoutPsychologistInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPsychologistInput, UserUpdateWithoutPsychologistInput>, UserUncheckedUpdateWithoutPsychologistInput>
  }

  export type SessionUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<SessionCreateWithoutPsychologistInput, SessionUncheckedCreateWithoutPsychologistInput> | SessionCreateWithoutPsychologistInput[] | SessionUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutPsychologistInput | SessionCreateOrConnectWithoutPsychologistInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutPsychologistInput | SessionUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: SessionCreateManyPsychologistInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutPsychologistInput | SessionUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutPsychologistInput | SessionUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionNoteUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<SessionNoteCreateWithoutPsychologistInput, SessionNoteUncheckedCreateWithoutPsychologistInput> | SessionNoteCreateWithoutPsychologistInput[] | SessionNoteUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutPsychologistInput | SessionNoteCreateOrConnectWithoutPsychologistInput[]
    upsert?: SessionNoteUpsertWithWhereUniqueWithoutPsychologistInput | SessionNoteUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: SessionNoteCreateManyPsychologistInputEnvelope
    set?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    disconnect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    delete?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    update?: SessionNoteUpdateWithWhereUniqueWithoutPsychologistInput | SessionNoteUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: SessionNoteUpdateManyWithWhereWithoutPsychologistInput | SessionNoteUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: SessionNoteScalarWhereInput | SessionNoteScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<SessionCreateWithoutPsychologistInput, SessionUncheckedCreateWithoutPsychologistInput> | SessionCreateWithoutPsychologistInput[] | SessionUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutPsychologistInput | SessionCreateOrConnectWithoutPsychologistInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutPsychologistInput | SessionUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: SessionCreateManyPsychologistInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutPsychologistInput | SessionUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutPsychologistInput | SessionUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionNoteUncheckedUpdateManyWithoutPsychologistNestedInput = {
    create?: XOR<SessionNoteCreateWithoutPsychologistInput, SessionNoteUncheckedCreateWithoutPsychologistInput> | SessionNoteCreateWithoutPsychologistInput[] | SessionNoteUncheckedCreateWithoutPsychologistInput[]
    connectOrCreate?: SessionNoteCreateOrConnectWithoutPsychologistInput | SessionNoteCreateOrConnectWithoutPsychologistInput[]
    upsert?: SessionNoteUpsertWithWhereUniqueWithoutPsychologistInput | SessionNoteUpsertWithWhereUniqueWithoutPsychologistInput[]
    createMany?: SessionNoteCreateManyPsychologistInputEnvelope
    set?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    disconnect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    delete?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    connect?: SessionNoteWhereUniqueInput | SessionNoteWhereUniqueInput[]
    update?: SessionNoteUpdateWithWhereUniqueWithoutPsychologistInput | SessionNoteUpdateWithWhereUniqueWithoutPsychologistInput[]
    updateMany?: SessionNoteUpdateManyWithWhereWithoutPsychologistInput | SessionNoteUpdateManyWithWhereWithoutPsychologistInput[]
    deleteMany?: SessionNoteScalarWhereInput | SessionNoteScalarWhereInput[]
  }

  export type PsychologistCreateNestedOneWithoutSessionsInput = {
    create?: XOR<PsychologistCreateWithoutSessionsInput, PsychologistUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: PsychologistCreateOrConnectWithoutSessionsInput
    connect?: PsychologistWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSessionsAsPatientInput = {
    create?: XOR<UserCreateWithoutSessionsAsPatientInput, UserUncheckedCreateWithoutSessionsAsPatientInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsAsPatientInput
    connect?: UserWhereUniqueInput
  }

  export type SessionNoteCreateNestedOneWithoutSessionInput = {
    create?: XOR<SessionNoteCreateWithoutSessionInput, SessionNoteUncheckedCreateWithoutSessionInput>
    connectOrCreate?: SessionNoteCreateOrConnectWithoutSessionInput
    connect?: SessionNoteWhereUniqueInput
  }

  export type SessionNoteUncheckedCreateNestedOneWithoutSessionInput = {
    create?: XOR<SessionNoteCreateWithoutSessionInput, SessionNoteUncheckedCreateWithoutSessionInput>
    connectOrCreate?: SessionNoteCreateOrConnectWithoutSessionInput
    connect?: SessionNoteWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PsychologistUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<PsychologistCreateWithoutSessionsInput, PsychologistUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: PsychologistCreateOrConnectWithoutSessionsInput
    upsert?: PsychologistUpsertWithoutSessionsInput
    connect?: PsychologistWhereUniqueInput
    update?: XOR<XOR<PsychologistUpdateToOneWithWhereWithoutSessionsInput, PsychologistUpdateWithoutSessionsInput>, PsychologistUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateOneRequiredWithoutSessionsAsPatientNestedInput = {
    create?: XOR<UserCreateWithoutSessionsAsPatientInput, UserUncheckedCreateWithoutSessionsAsPatientInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsAsPatientInput
    upsert?: UserUpsertWithoutSessionsAsPatientInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsAsPatientInput, UserUpdateWithoutSessionsAsPatientInput>, UserUncheckedUpdateWithoutSessionsAsPatientInput>
  }

  export type SessionNoteUpdateOneWithoutSessionNestedInput = {
    create?: XOR<SessionNoteCreateWithoutSessionInput, SessionNoteUncheckedCreateWithoutSessionInput>
    connectOrCreate?: SessionNoteCreateOrConnectWithoutSessionInput
    upsert?: SessionNoteUpsertWithoutSessionInput
    disconnect?: SessionNoteWhereInput | boolean
    delete?: SessionNoteWhereInput | boolean
    connect?: SessionNoteWhereUniqueInput
    update?: XOR<XOR<SessionNoteUpdateToOneWithWhereWithoutSessionInput, SessionNoteUpdateWithoutSessionInput>, SessionNoteUncheckedUpdateWithoutSessionInput>
  }

  export type SessionNoteUncheckedUpdateOneWithoutSessionNestedInput = {
    create?: XOR<SessionNoteCreateWithoutSessionInput, SessionNoteUncheckedCreateWithoutSessionInput>
    connectOrCreate?: SessionNoteCreateOrConnectWithoutSessionInput
    upsert?: SessionNoteUpsertWithoutSessionInput
    disconnect?: SessionNoteWhereInput | boolean
    delete?: SessionNoteWhereInput | boolean
    connect?: SessionNoteWhereUniqueInput
    update?: XOR<XOR<SessionNoteUpdateToOneWithWhereWithoutSessionInput, SessionNoteUpdateWithoutSessionInput>, SessionNoteUncheckedUpdateWithoutSessionInput>
  }

  export type SessionNoteCreatetagsInput = {
    set: string[]
  }

  export type SessionCreateNestedOneWithoutNoteInput = {
    create?: XOR<SessionCreateWithoutNoteInput, SessionUncheckedCreateWithoutNoteInput>
    connectOrCreate?: SessionCreateOrConnectWithoutNoteInput
    connect?: SessionWhereUniqueInput
  }

  export type PsychologistCreateNestedOneWithoutNotesInput = {
    create?: XOR<PsychologistCreateWithoutNotesInput, PsychologistUncheckedCreateWithoutNotesInput>
    connectOrCreate?: PsychologistCreateOrConnectWithoutNotesInput
    connect?: PsychologistWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutNotesAsPatientInput = {
    create?: XOR<UserCreateWithoutNotesAsPatientInput, UserUncheckedCreateWithoutNotesAsPatientInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesAsPatientInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRiskLevelFieldUpdateOperationsInput = {
    set?: $Enums.RiskLevel
  }

  export type SessionNoteUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type SessionUpdateOneRequiredWithoutNoteNestedInput = {
    create?: XOR<SessionCreateWithoutNoteInput, SessionUncheckedCreateWithoutNoteInput>
    connectOrCreate?: SessionCreateOrConnectWithoutNoteInput
    upsert?: SessionUpsertWithoutNoteInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutNoteInput, SessionUpdateWithoutNoteInput>, SessionUncheckedUpdateWithoutNoteInput>
  }

  export type PsychologistUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<PsychologistCreateWithoutNotesInput, PsychologistUncheckedCreateWithoutNotesInput>
    connectOrCreate?: PsychologistCreateOrConnectWithoutNotesInput
    upsert?: PsychologistUpsertWithoutNotesInput
    connect?: PsychologistWhereUniqueInput
    update?: XOR<XOR<PsychologistUpdateToOneWithWhereWithoutNotesInput, PsychologistUpdateWithoutNotesInput>, PsychologistUncheckedUpdateWithoutNotesInput>
  }

  export type UserUpdateOneRequiredWithoutNotesAsPatientNestedInput = {
    create?: XOR<UserCreateWithoutNotesAsPatientInput, UserUncheckedCreateWithoutNotesAsPatientInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesAsPatientInput
    upsert?: UserUpsertWithoutNotesAsPatientInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotesAsPatientInput, UserUpdateWithoutNotesAsPatientInput>, UserUncheckedUpdateWithoutNotesAsPatientInput>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PsychologistCreateWithoutUserInput = {
    education?: string | null
    experience?: string | null
    therapyApproach?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutPsychologistInput
    notes?: SessionNoteCreateNestedManyWithoutPsychologistInput
  }

  export type PsychologistUncheckedCreateWithoutUserInput = {
    id?: number
    education?: string | null
    experience?: string | null
    therapyApproach?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutPsychologistInput
    notes?: SessionNoteUncheckedCreateNestedManyWithoutPsychologistInput
  }

  export type PsychologistCreateOrConnectWithoutUserInput = {
    where: PsychologistWhereUniqueInput
    create: XOR<PsychologistCreateWithoutUserInput, PsychologistUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateWithoutPatientInput = {
    date: Date | string
    startTime?: string | null
    endTime?: string | null
    status?: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    psychologist: PsychologistCreateNestedOneWithoutSessionsInput
    note?: SessionNoteCreateNestedOneWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutPatientInput = {
    id?: number
    psychologistId: number
    date: Date | string
    startTime?: string | null
    endTime?: string | null
    status?: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    note?: SessionNoteUncheckedCreateNestedOneWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutPatientInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutPatientInput, SessionUncheckedCreateWithoutPatientInput>
  }

  export type SessionCreateManyPatientInputEnvelope = {
    data: SessionCreateManyPatientInput | SessionCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type SessionNoteCreateWithoutPatientInput = {
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
    session: SessionCreateNestedOneWithoutNoteInput
    psychologist: PsychologistCreateNestedOneWithoutNotesInput
  }

  export type SessionNoteUncheckedCreateWithoutPatientInput = {
    id?: number
    sessionId: number
    psychologistId: number
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

  export type SessionNoteCreateOrConnectWithoutPatientInput = {
    where: SessionNoteWhereUniqueInput
    create: XOR<SessionNoteCreateWithoutPatientInput, SessionNoteUncheckedCreateWithoutPatientInput>
  }

  export type SessionNoteCreateManyPatientInputEnvelope = {
    data: SessionNoteCreateManyPatientInput | SessionNoteCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type PsychologistUpsertWithoutUserInput = {
    update: XOR<PsychologistUpdateWithoutUserInput, PsychologistUncheckedUpdateWithoutUserInput>
    create: XOR<PsychologistCreateWithoutUserInput, PsychologistUncheckedCreateWithoutUserInput>
    where?: PsychologistWhereInput
  }

  export type PsychologistUpdateToOneWithWhereWithoutUserInput = {
    where?: PsychologistWhereInput
    data: XOR<PsychologistUpdateWithoutUserInput, PsychologistUncheckedUpdateWithoutUserInput>
  }

  export type PsychologistUpdateWithoutUserInput = {
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    therapyApproach?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutPsychologistNestedInput
    notes?: SessionNoteUpdateManyWithoutPsychologistNestedInput
  }

  export type PsychologistUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    therapyApproach?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutPsychologistNestedInput
    notes?: SessionNoteUncheckedUpdateManyWithoutPsychologistNestedInput
  }

  export type SessionUpsertWithWhereUniqueWithoutPatientInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutPatientInput, SessionUncheckedUpdateWithoutPatientInput>
    create: XOR<SessionCreateWithoutPatientInput, SessionUncheckedCreateWithoutPatientInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutPatientInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutPatientInput, SessionUncheckedUpdateWithoutPatientInput>
  }

  export type SessionUpdateManyWithWhereWithoutPatientInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutPatientInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: IntFilter<"Session"> | number
    psychologistId?: IntFilter<"Session"> | number
    patientId?: IntFilter<"Session"> | number
    date?: DateTimeFilter<"Session"> | Date | string
    startTime?: StringNullableFilter<"Session"> | string | null
    endTime?: StringNullableFilter<"Session"> | string | null
    status?: StringFilter<"Session"> | string
    deletedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type SessionNoteUpsertWithWhereUniqueWithoutPatientInput = {
    where: SessionNoteWhereUniqueInput
    update: XOR<SessionNoteUpdateWithoutPatientInput, SessionNoteUncheckedUpdateWithoutPatientInput>
    create: XOR<SessionNoteCreateWithoutPatientInput, SessionNoteUncheckedCreateWithoutPatientInput>
  }

  export type SessionNoteUpdateWithWhereUniqueWithoutPatientInput = {
    where: SessionNoteWhereUniqueInput
    data: XOR<SessionNoteUpdateWithoutPatientInput, SessionNoteUncheckedUpdateWithoutPatientInput>
  }

  export type SessionNoteUpdateManyWithWhereWithoutPatientInput = {
    where: SessionNoteScalarWhereInput
    data: XOR<SessionNoteUpdateManyMutationInput, SessionNoteUncheckedUpdateManyWithoutPatientInput>
  }

  export type SessionNoteScalarWhereInput = {
    AND?: SessionNoteScalarWhereInput | SessionNoteScalarWhereInput[]
    OR?: SessionNoteScalarWhereInput[]
    NOT?: SessionNoteScalarWhereInput | SessionNoteScalarWhereInput[]
    id?: IntFilter<"SessionNote"> | number
    sessionId?: IntFilter<"SessionNote"> | number
    psychologistId?: IntFilter<"SessionNote"> | number
    patientId?: IntFilter<"SessionNote"> | number
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

  export type UserCreateWithoutPsychologistInput = {
    email: string
    fullName: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionsAsPatient?: SessionCreateNestedManyWithoutPatientInput
    notesAsPatient?: SessionNoteCreateNestedManyWithoutPatientInput
  }

  export type UserUncheckedCreateWithoutPsychologistInput = {
    id?: number
    email: string
    fullName: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionsAsPatient?: SessionUncheckedCreateNestedManyWithoutPatientInput
    notesAsPatient?: SessionNoteUncheckedCreateNestedManyWithoutPatientInput
  }

  export type UserCreateOrConnectWithoutPsychologistInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPsychologistInput, UserUncheckedCreateWithoutPsychologistInput>
  }

  export type SessionCreateWithoutPsychologistInput = {
    date: Date | string
    startTime?: string | null
    endTime?: string | null
    status?: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: UserCreateNestedOneWithoutSessionsAsPatientInput
    note?: SessionNoteCreateNestedOneWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutPsychologistInput = {
    id?: number
    patientId: number
    date: Date | string
    startTime?: string | null
    endTime?: string | null
    status?: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    note?: SessionNoteUncheckedCreateNestedOneWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutPsychologistInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutPsychologistInput, SessionUncheckedCreateWithoutPsychologistInput>
  }

  export type SessionCreateManyPsychologistInputEnvelope = {
    data: SessionCreateManyPsychologistInput | SessionCreateManyPsychologistInput[]
    skipDuplicates?: boolean
  }

  export type SessionNoteCreateWithoutPsychologistInput = {
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
    session: SessionCreateNestedOneWithoutNoteInput
    patient: UserCreateNestedOneWithoutNotesAsPatientInput
  }

  export type SessionNoteUncheckedCreateWithoutPsychologistInput = {
    id?: number
    sessionId: number
    patientId: number
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

  export type SessionNoteCreateOrConnectWithoutPsychologistInput = {
    where: SessionNoteWhereUniqueInput
    create: XOR<SessionNoteCreateWithoutPsychologistInput, SessionNoteUncheckedCreateWithoutPsychologistInput>
  }

  export type SessionNoteCreateManyPsychologistInputEnvelope = {
    data: SessionNoteCreateManyPsychologistInput | SessionNoteCreateManyPsychologistInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPsychologistInput = {
    update: XOR<UserUpdateWithoutPsychologistInput, UserUncheckedUpdateWithoutPsychologistInput>
    create: XOR<UserCreateWithoutPsychologistInput, UserUncheckedCreateWithoutPsychologistInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPsychologistInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPsychologistInput, UserUncheckedUpdateWithoutPsychologistInput>
  }

  export type UserUpdateWithoutPsychologistInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionsAsPatient?: SessionUpdateManyWithoutPatientNestedInput
    notesAsPatient?: SessionNoteUpdateManyWithoutPatientNestedInput
  }

  export type UserUncheckedUpdateWithoutPsychologistInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionsAsPatient?: SessionUncheckedUpdateManyWithoutPatientNestedInput
    notesAsPatient?: SessionNoteUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type SessionUpsertWithWhereUniqueWithoutPsychologistInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutPsychologistInput, SessionUncheckedUpdateWithoutPsychologistInput>
    create: XOR<SessionCreateWithoutPsychologistInput, SessionUncheckedCreateWithoutPsychologistInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutPsychologistInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutPsychologistInput, SessionUncheckedUpdateWithoutPsychologistInput>
  }

  export type SessionUpdateManyWithWhereWithoutPsychologistInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutPsychologistInput>
  }

  export type SessionNoteUpsertWithWhereUniqueWithoutPsychologistInput = {
    where: SessionNoteWhereUniqueInput
    update: XOR<SessionNoteUpdateWithoutPsychologistInput, SessionNoteUncheckedUpdateWithoutPsychologistInput>
    create: XOR<SessionNoteCreateWithoutPsychologistInput, SessionNoteUncheckedCreateWithoutPsychologistInput>
  }

  export type SessionNoteUpdateWithWhereUniqueWithoutPsychologistInput = {
    where: SessionNoteWhereUniqueInput
    data: XOR<SessionNoteUpdateWithoutPsychologistInput, SessionNoteUncheckedUpdateWithoutPsychologistInput>
  }

  export type SessionNoteUpdateManyWithWhereWithoutPsychologistInput = {
    where: SessionNoteScalarWhereInput
    data: XOR<SessionNoteUpdateManyMutationInput, SessionNoteUncheckedUpdateManyWithoutPsychologistInput>
  }

  export type PsychologistCreateWithoutSessionsInput = {
    education?: string | null
    experience?: string | null
    therapyApproach?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPsychologistInput
    notes?: SessionNoteCreateNestedManyWithoutPsychologistInput
  }

  export type PsychologistUncheckedCreateWithoutSessionsInput = {
    id?: number
    userId: number
    education?: string | null
    experience?: string | null
    therapyApproach?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: SessionNoteUncheckedCreateNestedManyWithoutPsychologistInput
  }

  export type PsychologistCreateOrConnectWithoutSessionsInput = {
    where: PsychologistWhereUniqueInput
    create: XOR<PsychologistCreateWithoutSessionsInput, PsychologistUncheckedCreateWithoutSessionsInput>
  }

  export type UserCreateWithoutSessionsAsPatientInput = {
    email: string
    fullName: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    psychologist?: PsychologistCreateNestedOneWithoutUserInput
    notesAsPatient?: SessionNoteCreateNestedManyWithoutPatientInput
  }

  export type UserUncheckedCreateWithoutSessionsAsPatientInput = {
    id?: number
    email: string
    fullName: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    psychologist?: PsychologistUncheckedCreateNestedOneWithoutUserInput
    notesAsPatient?: SessionNoteUncheckedCreateNestedManyWithoutPatientInput
  }

  export type UserCreateOrConnectWithoutSessionsAsPatientInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsAsPatientInput, UserUncheckedCreateWithoutSessionsAsPatientInput>
  }

  export type SessionNoteCreateWithoutSessionInput = {
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
    psychologist: PsychologistCreateNestedOneWithoutNotesInput
    patient: UserCreateNestedOneWithoutNotesAsPatientInput
  }

  export type SessionNoteUncheckedCreateWithoutSessionInput = {
    id?: number
    psychologistId: number
    patientId: number
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

  export type SessionNoteCreateOrConnectWithoutSessionInput = {
    where: SessionNoteWhereUniqueInput
    create: XOR<SessionNoteCreateWithoutSessionInput, SessionNoteUncheckedCreateWithoutSessionInput>
  }

  export type PsychologistUpsertWithoutSessionsInput = {
    update: XOR<PsychologistUpdateWithoutSessionsInput, PsychologistUncheckedUpdateWithoutSessionsInput>
    create: XOR<PsychologistCreateWithoutSessionsInput, PsychologistUncheckedCreateWithoutSessionsInput>
    where?: PsychologistWhereInput
  }

  export type PsychologistUpdateToOneWithWhereWithoutSessionsInput = {
    where?: PsychologistWhereInput
    data: XOR<PsychologistUpdateWithoutSessionsInput, PsychologistUncheckedUpdateWithoutSessionsInput>
  }

  export type PsychologistUpdateWithoutSessionsInput = {
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    therapyApproach?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPsychologistNestedInput
    notes?: SessionNoteUpdateManyWithoutPsychologistNestedInput
  }

  export type PsychologistUncheckedUpdateWithoutSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    therapyApproach?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: SessionNoteUncheckedUpdateManyWithoutPsychologistNestedInput
  }

  export type UserUpsertWithoutSessionsAsPatientInput = {
    update: XOR<UserUpdateWithoutSessionsAsPatientInput, UserUncheckedUpdateWithoutSessionsAsPatientInput>
    create: XOR<UserCreateWithoutSessionsAsPatientInput, UserUncheckedCreateWithoutSessionsAsPatientInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsAsPatientInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsAsPatientInput, UserUncheckedUpdateWithoutSessionsAsPatientInput>
  }

  export type UserUpdateWithoutSessionsAsPatientInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistUpdateOneWithoutUserNestedInput
    notesAsPatient?: SessionNoteUpdateManyWithoutPatientNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsAsPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistUncheckedUpdateOneWithoutUserNestedInput
    notesAsPatient?: SessionNoteUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type SessionNoteUpsertWithoutSessionInput = {
    update: XOR<SessionNoteUpdateWithoutSessionInput, SessionNoteUncheckedUpdateWithoutSessionInput>
    create: XOR<SessionNoteCreateWithoutSessionInput, SessionNoteUncheckedCreateWithoutSessionInput>
    where?: SessionNoteWhereInput
  }

  export type SessionNoteUpdateToOneWithWhereWithoutSessionInput = {
    where?: SessionNoteWhereInput
    data: XOR<SessionNoteUpdateWithoutSessionInput, SessionNoteUncheckedUpdateWithoutSessionInput>
  }

  export type SessionNoteUpdateWithoutSessionInput = {
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
    psychologist?: PsychologistUpdateOneRequiredWithoutNotesNestedInput
    patient?: UserUpdateOneRequiredWithoutNotesAsPatientNestedInput
  }

  export type SessionNoteUncheckedUpdateWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    psychologistId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
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

  export type SessionCreateWithoutNoteInput = {
    date: Date | string
    startTime?: string | null
    endTime?: string | null
    status?: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    psychologist: PsychologistCreateNestedOneWithoutSessionsInput
    patient: UserCreateNestedOneWithoutSessionsAsPatientInput
  }

  export type SessionUncheckedCreateWithoutNoteInput = {
    id?: number
    psychologistId: number
    patientId: number
    date: Date | string
    startTime?: string | null
    endTime?: string | null
    status?: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutNoteInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutNoteInput, SessionUncheckedCreateWithoutNoteInput>
  }

  export type PsychologistCreateWithoutNotesInput = {
    education?: string | null
    experience?: string | null
    therapyApproach?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPsychologistInput
    sessions?: SessionCreateNestedManyWithoutPsychologistInput
  }

  export type PsychologistUncheckedCreateWithoutNotesInput = {
    id?: number
    userId: number
    education?: string | null
    experience?: string | null
    therapyApproach?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutPsychologistInput
  }

  export type PsychologistCreateOrConnectWithoutNotesInput = {
    where: PsychologistWhereUniqueInput
    create: XOR<PsychologistCreateWithoutNotesInput, PsychologistUncheckedCreateWithoutNotesInput>
  }

  export type UserCreateWithoutNotesAsPatientInput = {
    email: string
    fullName: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    psychologist?: PsychologistCreateNestedOneWithoutUserInput
    sessionsAsPatient?: SessionCreateNestedManyWithoutPatientInput
  }

  export type UserUncheckedCreateWithoutNotesAsPatientInput = {
    id?: number
    email: string
    fullName: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    psychologist?: PsychologistUncheckedCreateNestedOneWithoutUserInput
    sessionsAsPatient?: SessionUncheckedCreateNestedManyWithoutPatientInput
  }

  export type UserCreateOrConnectWithoutNotesAsPatientInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotesAsPatientInput, UserUncheckedCreateWithoutNotesAsPatientInput>
  }

  export type SessionUpsertWithoutNoteInput = {
    update: XOR<SessionUpdateWithoutNoteInput, SessionUncheckedUpdateWithoutNoteInput>
    create: XOR<SessionCreateWithoutNoteInput, SessionUncheckedCreateWithoutNoteInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutNoteInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutNoteInput, SessionUncheckedUpdateWithoutNoteInput>
  }

  export type SessionUpdateWithoutNoteInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistUpdateOneRequiredWithoutSessionsNestedInput
    patient?: UserUpdateOneRequiredWithoutSessionsAsPatientNestedInput
  }

  export type SessionUncheckedUpdateWithoutNoteInput = {
    id?: IntFieldUpdateOperationsInput | number
    psychologistId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PsychologistUpsertWithoutNotesInput = {
    update: XOR<PsychologistUpdateWithoutNotesInput, PsychologistUncheckedUpdateWithoutNotesInput>
    create: XOR<PsychologistCreateWithoutNotesInput, PsychologistUncheckedCreateWithoutNotesInput>
    where?: PsychologistWhereInput
  }

  export type PsychologistUpdateToOneWithWhereWithoutNotesInput = {
    where?: PsychologistWhereInput
    data: XOR<PsychologistUpdateWithoutNotesInput, PsychologistUncheckedUpdateWithoutNotesInput>
  }

  export type PsychologistUpdateWithoutNotesInput = {
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    therapyApproach?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPsychologistNestedInput
    sessions?: SessionUpdateManyWithoutPsychologistNestedInput
  }

  export type PsychologistUncheckedUpdateWithoutNotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    therapyApproach?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutPsychologistNestedInput
  }

  export type UserUpsertWithoutNotesAsPatientInput = {
    update: XOR<UserUpdateWithoutNotesAsPatientInput, UserUncheckedUpdateWithoutNotesAsPatientInput>
    create: XOR<UserCreateWithoutNotesAsPatientInput, UserUncheckedCreateWithoutNotesAsPatientInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotesAsPatientInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotesAsPatientInput, UserUncheckedUpdateWithoutNotesAsPatientInput>
  }

  export type UserUpdateWithoutNotesAsPatientInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistUpdateOneWithoutUserNestedInput
    sessionsAsPatient?: SessionUpdateManyWithoutPatientNestedInput
  }

  export type UserUncheckedUpdateWithoutNotesAsPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistUncheckedUpdateOneWithoutUserNestedInput
    sessionsAsPatient?: SessionUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type SessionCreateManyPatientInput = {
    id?: number
    psychologistId: number
    date: Date | string
    startTime?: string | null
    endTime?: string | null
    status?: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionNoteCreateManyPatientInput = {
    id?: number
    sessionId: number
    psychologistId: number
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

  export type SessionUpdateWithoutPatientInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    psychologist?: PsychologistUpdateOneRequiredWithoutSessionsNestedInput
    note?: SessionNoteUpdateOneWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    psychologistId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: SessionNoteUncheckedUpdateOneWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    psychologistId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionNoteUpdateWithoutPatientInput = {
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
    session?: SessionUpdateOneRequiredWithoutNoteNestedInput
    psychologist?: PsychologistUpdateOneRequiredWithoutNotesNestedInput
  }

  export type SessionNoteUncheckedUpdateWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    psychologistId?: IntFieldUpdateOperationsInput | number
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

  export type SessionNoteUncheckedUpdateManyWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    psychologistId?: IntFieldUpdateOperationsInput | number
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

  export type SessionCreateManyPsychologistInput = {
    id?: number
    patientId: number
    date: Date | string
    startTime?: string | null
    endTime?: string | null
    status?: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionNoteCreateManyPsychologistInput = {
    id?: number
    sessionId: number
    patientId: number
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

  export type SessionUpdateWithoutPsychologistInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: UserUpdateOneRequiredWithoutSessionsAsPatientNestedInput
    note?: SessionNoteUpdateOneWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutPsychologistInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: SessionNoteUncheckedUpdateOneWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutPsychologistInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionNoteUpdateWithoutPsychologistInput = {
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
    session?: SessionUpdateOneRequiredWithoutNoteNestedInput
    patient?: UserUpdateOneRequiredWithoutNotesAsPatientNestedInput
  }

  export type SessionNoteUncheckedUpdateWithoutPsychologistInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
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

  export type SessionNoteUncheckedUpdateManyWithoutPsychologistInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
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