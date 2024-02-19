import os
import requests
import registry
from dotenv import load_dotenv
from flask import jsonify


def steam(steamID):
    load_dotenv()
    steamAPIKey = os.getenv("STEAM_API_KEY")
    url = f"https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key={steamAPIKey}&steamid={steamID}&include_appinfo=true&include_played_free_games=true"
    response = requests.get(url=url)
    owned_games = response.json()
    owned_games = owned_games["response"]
    games_list: list = owned_games["games"]

    sorted_games_list = []

    game_names = [i["name"] for i in games_list]


    game_names.sort()

    end = len(game_names)
    while len(sorted_games_list) < end:
        for i in range(len(games_list)):
            if games_list[i]["name"] == game_names[0]:
                sorted_games_list.append(games_list[i])
                game_names.pop(0)
                break

    steamFolder = registry.getSteamFolder()

    installedGames = []
    registryKeys = registry.getGameKeys()

    for i in registryKeys:
        if i['value'] == 1:
            installedGames.append(i['gameID'])


    for index, game in enumerate(sorted_games_list):
        id1 = game['appid']
        is_installed = any(int(id1) == int(installed_id) for installed_id in installedGames)
        sorted_games_list[index]['installed'] = "true" if is_installed else "false"



    return {"games":sorted_games_list,"steamFolder":steamFolder}