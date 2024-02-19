import winreg




def get_registry_subkeys(key, subkey):
    try:
        # Open the registry key
        hkey = winreg.OpenKey(key, subkey, 0, winreg.KEY_READ)

        # Get the number of subkeys under the key
        num_subkeys = winreg.QueryInfoKey(hkey)[0]

        # Iterate over each subkey and retrieve its name
        subkeys = [winreg.EnumKey(hkey, i) for i in range(num_subkeys)]

        # Close the key
        winreg.CloseKey(hkey)

        return subkeys
    except FileNotFoundError:
        return []



def get_registry_value_names(key, subkey):
    try:
        # Open the registry key
        hkey = winreg.OpenKey(key, subkey, 0, winreg.KEY_READ)

        # Get the number of values under the key
        num_values = winreg.QueryInfoKey(hkey)[1]

        # Iterate over each value and retrieve its name
        value_names = [winreg.EnumValue(hkey, i)[0] for i in range(num_values)]

        # Close the key
        winreg.CloseKey(hkey)

        return value_names
    except FileNotFoundError:
        return []




def read_registry_value(key, subkey, value_name):
    try:
        # Open the registry key
        hkey = winreg.OpenKey(key, subkey, 0, winreg.KEY_READ)

        # Query the value
        value, _ = winreg.QueryValueEx(hkey, value_name)

        # Close the key
        winreg.CloseKey(hkey)

        return value
    except FileNotFoundError:
        return None

# Example usage

def getSteamFolder():
    key = winreg.HKEY_LOCAL_MACHINE
    subkey = r"SOFTWARE\WOW6432Node\Valve\Steam"
    value = "InstallPath"
    return read_registry_value(key,subkey,value)

def getGameKeys():
    # Specify the registry key, subkey, and value name you want to read
    key = winreg.HKEY_CURRENT_USER
    subkey = r"SOFTWARE\Valve\Steam\Apps"
    # value_name = get_registry_value_names(key,subkey)
    # print(value_name)
    allSubkeys = get_registry_subkeys(key,subkey)
    returnList = []
    for i in allSubkeys:
        newSubkey = fr"{subkey}\{i}"
        value_name = read_registry_value(key,newSubkey,"Installed")
        returnList.append({"gameID" : i, "value" : value_name})
    return returnList

    # Read the value
    # value = read_registry_value(key, subkey, value_name)

    # if value is not None:
    #     print(f"The value of '{value_name}' is: {value}")
    # else:
    #     print(f"Registry value '{value_name}' not found.")

