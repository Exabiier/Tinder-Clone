const getMatchedUserInfo = (users: Record<string, FireBaseData>, userLoggedIn: string) => {
    const newUsers = { ...users };
    delete newUsers[userLoggedIn]
    const [id, user] = Object.entries(newUsers).flat();
    // @ts-ignore: need to find resolution for ts spread oprator typing
    return {id, ...user};
}

export default getMatchedUserInfo;