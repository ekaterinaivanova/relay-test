import React from 'react';
import {graphql} from 'react-relay';
import {useFragment} from 'relay-hooks';
import type {ConferenceList_conferences} from 'relay/ConferenceList_conferences.graphql';
import ConferenceOrganizer from './ConferenceOrganizer';
type Props = {|
  +conferences: ConferenceList_conferences,
|};

const fragmentSpec = graphql`
  fragment SpeakerList_conferences on Conference {
    speakers {
      id
      name
      aboutShort
      company
    }
  }
`;

const SpeakerList = ({conferences}: Props) => {
  const {speakers} = useFragment(fragmentSpec, conferences);
  if (speakers.length < 1) {
    return (<p>There are no speakers</p>)
  }
  const speakerItems = speakers.map(({
    id,
    name,
    company,
    aboutShort
  }) => {
    const workingAt = company != null ? (<span>
      working at {company}    
    </span>) : null;
    return (
      <li style={{marginBottom: '12px'}} key={id}>
          <p>{name} {workingAt}</p> 
          <div style={{ border: '1px solid grey', padding: '12px', borderRadius: '4px'}}>
            <b>About</b>
            <p style={{fontSize: '0.9em'}}>{aboutShort || 'No data about this speaker'}</p>
          </div>
      </li>
    )
  })

  return (
    <div>
      <h3>
        Speakers
      </h3>
      <ul>
        {speakerItems}
      </ul>
    </div>
  );
};

export default SpeakerList;
