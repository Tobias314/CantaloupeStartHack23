import pandas as pd
import re
from tqdm.auto import tqdm

PATTERNS = {
    'join_hate_kick_regex':re.compile('J.*R.*L')
}

def parse_event(alliance_messages, alliance_actions, account_id):
    if alliance_messages is not None:
        #message_events
        alliance_messages['event'] = ''
        #user risk event
        alliance_messages.loc[(alliance_messages.account_id == account_id) & (alliance_messages.risk>=3),'event'] = 'R'
        
        alliance_messages = pd.DataFrame({'type':0, 'id':alliance_messages.index, 'timestamp':alliance_messages.timestamp, 'event':alliance_messages.event})
    
    if alliance_actions is not None:
        #meta_events
        alliance_actions['event'] =  ''
        #user join event
        alliance_actions.loc[(alliance_actions.account_id == account_id) & (alliance_actions.action=='join'),'event'] = 'J'
        #user leave event
        alliance_actions.loc[(alliance_actions.account_id == account_id) & (alliance_actions.action=='leave'),'event'] = 'L'
        #user got kicked event
        alliance_actions.loc[(alliance_actions.account_id == account_id) & (alliance_actions.action=='kicked_out'),'event'] = 'K'
        
        alliance_actions = pd.DataFrame({'type':1, 'id':alliance_actions.index,  'timestamp':alliance_actions.timestamp, 'event':alliance_actions.event})
    
    protocol = pd.concat([alliance_messages, alliance_actions], ignore_index=True, axis=0).sort_values('timestamp', ascending=True)
   
    event_string =  ''.join('(' + protocol.event + ')')
    
    result=dict()
    for name, pattern in PATTERNS.items():
        res = re.search(pattern, event_string)
        if res is not None:
            result[name]=res.span()
    return result

def find_all_patterns(data):
    results = dict()
    alliance_message_groups = {i:g for i,g in data.messages.groupby('alliance_id')}
    alliance_action_groups = {i:g for i,g in data.alliance_membership.groupby('alliance_id')}
    for alliance_id, alliance_messages in tqdm(alliance_message_groups.items(), total=len(alliance_message_groups)):
        alliance_actions = alliance_action_groups.get(alliance_id, None)
        account_ids = alliance_messages.account_id.unique()
        found_dict = {}
        for account_id in account_ids:
            finds = parse_event(alliance_messages=alliance_messages, alliance_actions=alliance_actions, account_id=account_id)
            if len(finds):
                found_dict[account_id] = finds
        if len(found_dict):
            results[alliance_id]=found_dict
    return results