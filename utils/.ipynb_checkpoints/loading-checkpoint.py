from pathlib import Path
from dataclasses import dataclass

import pandas as pd

@dataclass
class Data:
    messages: pd.DataFrame
    alliance_membership: pd.DataFrame
    alliance_size: pd.DataFrame
    accounts: pd.DataFrame

def load_data(directory: str):
    path = Path(directory)
    messages1 = pd.read_csv(path / 'chat_messages_1_fixed.csv')
    messages2 = pd.read_csv(path /'chat_messages_2_fixed.csv')
    messages = pd.concat([messages1, messages2]).dropna()
    messages['filterted'] = messages.filtered.astype(float)
    messages.timestamp = pd.to_datetime(messages.timestamp)
    alliance_membership = pd.read_csv(path/'alliance_membership.csv')
    alliance_membership.timestamp = pd.to_datetime(alliance_membership.timestamp)
    alliance_size = alliance_membership.groupby('alliance_id')['size'].mean()
    accounts = pd.read_csv(path / 'accounts.csv')
    accounts.created_time = pd.to_datetime(accounts.created_time)
    accounts.last_active_date = pd.to_datetime(accounts.last_active_date)
    return Data(messages=messages, alliance_membership=alliance_membership, alliance_size=alliance_size, accounts=accounts)