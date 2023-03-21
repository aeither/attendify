export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: string;
  Bytes: string;
};

export type Attestation = {
  __typename?: 'Attestation';
  about: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  creator: Scalars['Bytes'];
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  indexForAbout: Scalars['BigInt'];
  indexForCreator: Scalars['BigInt'];
  indexForKey: Scalars['BigInt'];
  indexForKeyAndAbout: Scalars['BigInt'];
  indexForKeyAndCreator: Scalars['BigInt'];
  key: Scalars['Bytes'];
  transactionHash: Scalars['Bytes'];
  val: Scalars['Bytes'];
};

export type Attestation_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  about?: InputMaybe<Scalars['Bytes']>;
  about_contains?: InputMaybe<Scalars['Bytes']>;
  about_gt?: InputMaybe<Scalars['Bytes']>;
  about_gte?: InputMaybe<Scalars['Bytes']>;
  about_in?: InputMaybe<Array<Scalars['Bytes']>>;
  about_lt?: InputMaybe<Scalars['Bytes']>;
  about_lte?: InputMaybe<Scalars['Bytes']>;
  about_not?: InputMaybe<Scalars['Bytes']>;
  about_not_contains?: InputMaybe<Scalars['Bytes']>;
  about_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<Attestation_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creator?: InputMaybe<Scalars['Bytes']>;
  creator_contains?: InputMaybe<Scalars['Bytes']>;
  creator_gt?: InputMaybe<Scalars['Bytes']>;
  creator_gte?: InputMaybe<Scalars['Bytes']>;
  creator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creator_lt?: InputMaybe<Scalars['Bytes']>;
  creator_lte?: InputMaybe<Scalars['Bytes']>;
  creator_not?: InputMaybe<Scalars['Bytes']>;
  creator_not_contains?: InputMaybe<Scalars['Bytes']>;
  creator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  index?: InputMaybe<Scalars['BigInt']>;
  indexForAbout?: InputMaybe<Scalars['BigInt']>;
  indexForAbout_gt?: InputMaybe<Scalars['BigInt']>;
  indexForAbout_gte?: InputMaybe<Scalars['BigInt']>;
  indexForAbout_in?: InputMaybe<Array<Scalars['BigInt']>>;
  indexForAbout_lt?: InputMaybe<Scalars['BigInt']>;
  indexForAbout_lte?: InputMaybe<Scalars['BigInt']>;
  indexForAbout_not?: InputMaybe<Scalars['BigInt']>;
  indexForAbout_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  indexForCreator?: InputMaybe<Scalars['BigInt']>;
  indexForCreator_gt?: InputMaybe<Scalars['BigInt']>;
  indexForCreator_gte?: InputMaybe<Scalars['BigInt']>;
  indexForCreator_in?: InputMaybe<Array<Scalars['BigInt']>>;
  indexForCreator_lt?: InputMaybe<Scalars['BigInt']>;
  indexForCreator_lte?: InputMaybe<Scalars['BigInt']>;
  indexForCreator_not?: InputMaybe<Scalars['BigInt']>;
  indexForCreator_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  indexForKey?: InputMaybe<Scalars['BigInt']>;
  indexForKeyAndAbout?: InputMaybe<Scalars['BigInt']>;
  indexForKeyAndAbout_gt?: InputMaybe<Scalars['BigInt']>;
  indexForKeyAndAbout_gte?: InputMaybe<Scalars['BigInt']>;
  indexForKeyAndAbout_in?: InputMaybe<Array<Scalars['BigInt']>>;
  indexForKeyAndAbout_lt?: InputMaybe<Scalars['BigInt']>;
  indexForKeyAndAbout_lte?: InputMaybe<Scalars['BigInt']>;
  indexForKeyAndAbout_not?: InputMaybe<Scalars['BigInt']>;
  indexForKeyAndAbout_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  indexForKeyAndCreator?: InputMaybe<Scalars['BigInt']>;
  indexForKeyAndCreator_gt?: InputMaybe<Scalars['BigInt']>;
  indexForKeyAndCreator_gte?: InputMaybe<Scalars['BigInt']>;
  indexForKeyAndCreator_in?: InputMaybe<Array<Scalars['BigInt']>>;
  indexForKeyAndCreator_lt?: InputMaybe<Scalars['BigInt']>;
  indexForKeyAndCreator_lte?: InputMaybe<Scalars['BigInt']>;
  indexForKeyAndCreator_not?: InputMaybe<Scalars['BigInt']>;
  indexForKeyAndCreator_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  indexForKey_gt?: InputMaybe<Scalars['BigInt']>;
  indexForKey_gte?: InputMaybe<Scalars['BigInt']>;
  indexForKey_in?: InputMaybe<Array<Scalars['BigInt']>>;
  indexForKey_lt?: InputMaybe<Scalars['BigInt']>;
  indexForKey_lte?: InputMaybe<Scalars['BigInt']>;
  indexForKey_not?: InputMaybe<Scalars['BigInt']>;
  indexForKey_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  key?: InputMaybe<Scalars['Bytes']>;
  key_contains?: InputMaybe<Scalars['Bytes']>;
  key_gt?: InputMaybe<Scalars['Bytes']>;
  key_gte?: InputMaybe<Scalars['Bytes']>;
  key_in?: InputMaybe<Array<Scalars['Bytes']>>;
  key_lt?: InputMaybe<Scalars['Bytes']>;
  key_lte?: InputMaybe<Scalars['Bytes']>;
  key_not?: InputMaybe<Scalars['Bytes']>;
  key_not_contains?: InputMaybe<Scalars['Bytes']>;
  key_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<Attestation_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  val?: InputMaybe<Scalars['Bytes']>;
  val_contains?: InputMaybe<Scalars['Bytes']>;
  val_gt?: InputMaybe<Scalars['Bytes']>;
  val_gte?: InputMaybe<Scalars['Bytes']>;
  val_in?: InputMaybe<Array<Scalars['Bytes']>>;
  val_lt?: InputMaybe<Scalars['Bytes']>;
  val_lte?: InputMaybe<Scalars['Bytes']>;
  val_not?: InputMaybe<Scalars['Bytes']>;
  val_not_contains?: InputMaybe<Scalars['Bytes']>;
  val_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Attestation_OrderBy {
  About = 'about',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Creator = 'creator',
  Id = 'id',
  Index = 'index',
  IndexForAbout = 'indexForAbout',
  IndexForCreator = 'indexForCreator',
  IndexForKey = 'indexForKey',
  IndexForKeyAndAbout = 'indexForKeyAndAbout',
  IndexForKeyAndCreator = 'indexForKeyAndCreator',
  Key = 'key',
  TransactionHash = 'transactionHash',
  Val = 'val'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Count = {
  __typename?: 'Count';
  count: Scalars['BigInt'];
  id: Scalars['ID'];
};

export type Count_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Count_Filter>>>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<Count_Filter>>>;
};

export enum Count_OrderBy {
  Count = 'count',
  Id = 'id'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  attestation?: Maybe<Attestation>;
  attestations: Array<Attestation>;
  count?: Maybe<Count>;
  counts: Array<Count>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAttestationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAttestationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Attestation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Attestation_Filter>;
};


export type QueryCountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Count_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Count_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  attestation?: Maybe<Attestation>;
  attestations: Array<Attestation>;
  count?: Maybe<Count>;
  counts: Array<Count>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAttestationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAttestationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Attestation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Attestation_Filter>;
};


export type SubscriptionCountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Count_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Count_Filter>;
};

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type AttestationsQueryVariables = Exact<{
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Attestation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Attestation_Filter>;
}>;


export type AttestationsQuery = { __typename?: 'Query', attestations: Array<{ __typename?: 'Attestation', id: string, creator: string, about: string, key: string, val: string, blockNumber: string, blockTimestamp: string, transactionHash: string, index: string, indexForCreator: string, indexForAbout: string, indexForKey: string, indexForKeyAndCreator: string, indexForKeyAndAbout: string }> };
