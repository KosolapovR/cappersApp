import {Post} from "../interfaces/Post";
import {User} from "../interfaces/User";
import {TableData} from "../interfaces/TableData";
import {ASC, BODY, ID, TITLE, USERNAME} from "../config/types";

export function mergePostsAndUsers(posts: Array<Post>, users: Array<User>): Array<TableData> {
    const mergedArray: Array<TableData> = [];
    posts.forEach(p => {
        let username = users.find(u => u.id === p.userId)?.username;
        if (username)
            mergedArray.push({
                id: p.id,
                username,
                body: p.body,
                title: p.title
            })
    });

    return mergedArray;
}

export function sortArray(data: Array<TableData>, col: String, dir: String): Array<TableData> {
    switch (col) {
        case ID: {
            return data.sort((a, b) => dir === ASC ? a.id - b.id : b.id - a.id);
        }
        case USERNAME: {
            return data.sort((a, b) =>
                (a.username && b.username)  ? a.username.localeCompare(b.username) : 1
            );
        }
        case TITLE: {
            return data.sort((a, b) =>
                (a.title && b.title)  ? a.title.localeCompare(b.title) : 1
            );
        }
        case BODY: {
            return data.sort((a, b) =>
                (a.body && b.body)  ? a.body.localeCompare(b.body) : 1
            );
        }
        default:
            return data;
    }
}
