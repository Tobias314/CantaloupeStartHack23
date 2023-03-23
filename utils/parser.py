import pandas as pd
import re

PATTERNS = {
    'join_hate_kick_regex':re.compile('J.*R.*L')
}

def parse_event(alliance_messages, alliance_actions, account_id):
    #message_events
    alliance_messages['event'] = ''
    #user risk event
    alliance_messages.loc[(alliance_messages.account_id == account_id) & (alliance_messages.risk>=3),'event'] = 'R'
    
    #meta_events
    alliance_actions['event'] =  ''
    #user join event
    alliance_actions.loc[(alliance_actions.account_id == account_id) & (alliance_actions.action=='join'),'event'] = 'J'
    #user leave event
    alliance_actions.loc[(alliance_actions.account_id == account_id) & (alliance_actions.action=='leave'),'event'] = 'L'
    
    messages = pd.DataFrame({'type':0, 'id':alliance_messages.index, 'timestamp':alliance_messages.timestamp, 'event':alliance_messages.event})
    actions = pd.DataFrame({'type':1, 'id':alliance_actions.index,  'timestamp':alliance_actions.timestamp, 'event':alliance_actions.event})
    protocol = pd.concat([messages, actions], ignore_index=True, axis=0).sort_values('timestamp', ascending=True)
    
   
    event_string =  ''.join('(' + protocol.event + ')')
    
    result=dict()
    for name, pattern in PATTERNS.items():
        res = re.search(pattern, event_string)
        result[name]=res.span()
    return result