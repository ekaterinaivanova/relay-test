import React from 'react';
import {graphql} from 'react-relay';
import {useFragment} from 'relay-hooks';
import type {ConferenceOrganizer_conferences} from 'relay/ConferenceOrganizer_conferences.graphql';

type Props = {|
  +organizer: ConferenceOrganizer_conferences,
|};

const fragmentSpec = graphql`
  fragment ConferenceOrganizer_conferences on Conference  {
    organizer {
      name
      lastName
      location {
        name
        about
        city
        address
      }
    }
  }
`;

const ConferenceOrganizer = ({organizer}: Props) => {
  const {organizer: organizerResult} = useFragment(fragmentSpec, organizer);
  
  return (
    <div style={{border: '1px solid grey', padding: '8px', backgroundColor: '#f3f3f3', borderRadius: '4px', marginTop: '24px'}}>
      Organizer
      <p>Name: {organizerResult.name} {organizerResult.lastName}</p>
      Location:
      <pre>{JSON.stringify(organizerResult.location, null, 2)}</pre>
    </div>
  );
};

export default ConferenceOrganizer;
