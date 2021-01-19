import * as React from 'react';

import {useState} from 'react';

import {graphql} from 'react-relay'
import {
  useQuery,
  useLazyLoadQuery,
  RelayEnvironmentProvider,
} from 'relay-hooks';
import {
  Environment,
  Network,
  RecordSource,
  Store,
  type Variables,
  type ObservableFromValue,
  type GraphQLResponse
} from 'relay-runtime';

import ConferenceList from './components/ConferenceList';

async function fetchQuery(
  operation: any,
  variables: Variables,
  ): ObservableFromValue<GraphQLResponse> {
    const url = 'https://api.react-finland.fi/graphql'
    const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
}

const modernEnvironment: Environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

const isServer = typeof window === 'undefined';

const LayoutConferences = () => {
  const queryItem = graphql`
  query appQuery {
    conferences {
      ...ConferenceList_conferences
    }
  }
  `;
  const {data, retry, error, isLoading} = useQuery(
    queryItem,
    {},
    {
      fetchPolicy: 'store-or-network',
    },
  );

  if(isLoading) {
    return <div>loading</div>
  } else if (error) {
    return (
      <div>
        {error.message}
        <button onClick={retry} className="refetch">
          Retry
        </button>
      </div>
    );
  }
  console.log('renderer', data);
  const conferences = data?.conferences
  return <ConferenceList conferences={conferences}/>;
};

const App = isServer ? (
  <div />
) : (
  <RelayEnvironmentProvider environment={modernEnvironment}>
    <React.Suspense fallback={<div>loading suspense</div>}>
    <LayoutConferences />

    </React.Suspense>
  </RelayEnvironmentProvider>
);

export default App;
