# カプセル化
# @property を使用すれば、より簡素な記述可能

import dataclasses
from datetime import datetime

@dataclasses.dataclass
class User :
    
    def __init__(
        self, 
        id: str, 
        name: str, 
        password: str, 
        create_date: datetime, 
        update_date: datetime
    ) :
        self.__id = id
        self.__name = name
        self.__password = password
        self.__create_date = create_date
        self.__update_date = update_date
    
    def setId(self, id: str) :
        self.__id = id
        
    def getId(self) :
        return self.__id
    
    def setName(self, name: str) :
        self.__name = name
        
    def getName(self) :
        return self.__name
    
    def setPassword(self, password: str) :
        self.__password = password
        
    def getPassword(self) :
        return self.__password
    
    def setCreateDate(self, create_date: datetime) :
        self.__create_date = create_date
    
    def getCreateDate(self) :
        return self.__create_date
    
    def setUpdateDate(self, update_date: datetime) :
        self.__update_date = update_date
        
    def getUpdateDate(self) :
        return self.__update_date
