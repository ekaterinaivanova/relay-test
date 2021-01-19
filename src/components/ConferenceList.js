import React from 'react';
import {graphql} from 'react-relay';
import {useFragment} from 'relay-hooks';
import type {ConferenceList_conferences} from 'relay/ConferenceList_conferences.graphql';
import ConferenceOrganizer from './ConferenceOrganizer';
import SpeakerList from './SpeakerList';
type Props = {|
  +conferences: ConferenceList_conferences,
|};

const fragmentSpec = graphql`
  fragment ConferenceList_conferences on Conference @relay(plural: true)  {
    id
    name
    endDate,
    ...ConferenceOrganizer_conferences,
    ...SpeakerList_conferences
  }
`;

const ConferenceList = ({conferences}: Props) => {
  const conferencesResults = useFragment(fragmentSpec, conferences);
  const conferenceItems = conferencesResults.map(item => {
    return (
      <div style={{marginBottom: '12px'}} key={item.id}>
       <h2>
        {item.name}
         </h2> 
         Ends at {item.endDate}
        <ConferenceOrganizer organizer={item}/>
        <SpeakerList conferences={item}/>
      </div>
    )
  })

  return (
    <div>
      {conferenceItems}
    </div>
  );
};

export default ConferenceList;
