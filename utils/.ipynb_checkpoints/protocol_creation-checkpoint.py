from sklearn.preprocessing import OrdinalEncoder
import datetime as dt
import pandas as pd
from tqdm.auto import tqdm


def summarize_alliance(data, alliance_id=None):
    if alliance_id is None:
        groups = [g for i,g in data.messages.groupby('alliance_id')]
    else:
        groups = [data.messages[data.messages.alliance_id == alliance_id]]
        
    res = []
    for alliance_messages in tqdm(groups):
        alliance_messages['content'] = alliance_messages['filtered_message']
        alliance_messages['type'] = "Chat|" + alliance_messages['account_id'].str[:3]
        actions = data.alliance_membership[data.alliance_membership.alliance_id==alliance_id]
        actions = actions[['timestamp','action','account_id']]
        actions['content'] = actions['action'] 
        actions['type'] = "Action|" + actions['account_id'].str[:3]

        #enc = OrdinalEncoder()
        #enc.fit(actions[["account_id"]])
        #actions["account_id_enc"] = enc.transform(actions[["account_id"]])
        #users_enc = actions["account_id_enc"].unique()
        users = actions["account_id"].unique()
        for user in users:
            #print(user)
            user_account = data.accounts[data.accounts["account_id"] == user]
            row = user_account.iloc[0]
            #print(row)
            risk_mean = data.messages[data.messages.account_id == user]["risk"].mean()
            print(f"User: {row.account_id[0:20]} | {round(row.revenue_today, 2)}$/{round(row.revenue, 2)}$ | {round(row.session_duration_today / 60 / 60, 2)}h {round(row.session_duration / 60 / 60 ,2)}h | {row.level}lvl | since {(row.last_active_date - row.created_time).days} days | risk mean {round(risk_mean, 2)}")
            #print(user_account)

        # TODO: Print "Outlier" statistics for users in group
        joined = pd.concat([alliance_messages, actions]).sort_values("timestamp")
        joined[["content", "type", "account_id"]]
        res.append(joined)
    if alliance_id is None:
        return res
    else:
        return res[0]
    # print(enc.categories_)