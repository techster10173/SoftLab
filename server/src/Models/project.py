class Project:
    #initialize with no inputs
    def __init__(self):
        self.projectName = ""
        self.mainUser = set()
        self.editor = set()
        self.viewer = set()
        self.hardwares = {} # hardwareID : units being used
        self.funds = 0
        self.description = ""
        self.dateCreated = 0.0
        self.dateUpdated = 0.0

    def initProject(self, mainUser, projectName, funds, description, dateCreated, dateUpdated):
        self.name = projectName
        self.mainUser.append(mainUser)
        self.funds = funds
        self.description = description
        self.dateCreated = dateCreated
        self.dateUpdated = dateUpdated

    def getHardwareUnits(self, hardware):
        if(hardware in self.hardwares):
            return self.hardwares.get(hardware)
    
    def setHardwareUnits(self, hardware, units):
        if(hardware in self.hardwares):
            self.hardwares.update({hardware: units})

    def addHardware(self, hardware, units):
        self.hardwares.update({hardware: units})

    def removeHardware(self, hardware):
        self.hardwares.pop(hardware)

    def setDescription(self, description):
        self.description = description
    
    def setFunds(self, funds):
        self.funds = funds

    def getFunds(self):
        return self.funds
    
    def addFunds(self, funds):
        self.funds += funds

    def removeFunds(self, funds):
        if(self.funds - funds >= 0):
            self.funds -= funds
            return True
        return False

    def isMainUser(self, user):
        if(user in self.mainUser):
            return True
    
    def addMainUser(self, user):
        self.mainUser.add(user)

    def removeMainUser(self, user):
        if(self.isMainUser(self, user)):
            self.mainUser.remove(user)
            return True
        return False

    def isEditor(self, user):
        if(user in self.editor):
            return True
    
    def addEditor(self, user):
        self.editor.append(user)

    def removeEditor(self, user):
        if(self.isEditor(self, user)):
            self.editor.remove(user)
            return True
        return False

    def isViewer(self, user):
        if(user in self.viewer):
            return True

    def addViewer(self, user):
        self.viewer.append(user)

    def removeViewer(self, user):
        if(self.isViewer(self, user)):
            self.viewer.remove(user)
            return True
        return False

    def updateDate(self, date):
        self.updateDate = date

    



