

def create_chatgpt_prompt(alliance_summary):
    res = ''
    for i,row in alliance_summary.iterrows():
        usr = row.type.split('|')[-1]
        if 'Action' in row.type:
            action = row.content
            if action in ['leave', 'join']:
                action = f'User {usr} {action + "s"}'
            elif 'kick' in action:
                action = f'User {usr} was kicked'
            else:
                action = '...'
            res+= '\n' + action
        else:
            res+= '\n' + f'User {usr} says: {row.content}'
    header = 'First, summarize the following group chat from the mobile game clash royal:\n'
    footer = '\n\nSecond, take the role of a neutral moderator. List users using inappropriate language.'
    return header + res + footer