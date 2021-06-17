import React from 'react'
import CallBox from './CallBox'
import QueuePlayNextTwoToneIcon from '@material-ui/icons/QueuePlayNextTwoTone';
import AddToQueueTwoToneIcon from '@material-ui/icons/AddToQueueTwoTone';

function CallOption() {
    return (
        <div id="callbox_grid">
          <CallBox  call_name="Start Call" call_icon={<AddToQueueTwoToneIcon className="call_icon" style={{fontSize:120}}/>}/>
          <CallBox call_name="Join Call" call_icon={<QueuePlayNextTwoToneIcon className="call_icon" style={{fontSize:120}}/>}/>
        </div>
    )
}

export default CallOption
