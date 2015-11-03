'use babel'
import React from 'react'
import MsgList from '../com/msg-list'
import Card from '../com/msg-list/card'
import * as HelpCards from '../com/help/cards'

const FILTERS = [
  { label: 'All', fn: msg => true },
  { label: <span><i className="fa fa-hand-peace-o"/> Likes</span>, fn: msg => true }, // TODO
  { label:<span><i className="fa fa-user-plus"/> Follows</span>, fn: msg => true }, // TODO
  { label: <span><i className="fa fa-at"/> Mentions</span>, fn: msg => msg.mentionsUser }
]

export default class Notifications extends React.Component {
  cursor (msg) {
    if (msg)
      return [msg.ts, false]
  }

  helpCards() {
    return <div className="cards-flow">
      <HelpCards.Notifications />
      <HelpCards.Contacts />
      <HelpCards.Pubs />
    </div>
  }

  render() {
    return <div id="notifications">
      <MsgList
        ListItem={Card}
        emptyMsg="No new notifications."
        append={this.helpCards.bind(this)}
        filters={FILTERS}
        source={app.ssb.patchwork.createNotificationsStream}
        cursor={this.cursor} 
        live={{ gt: [Date.now(), false] }} />
    </div>
  }
}