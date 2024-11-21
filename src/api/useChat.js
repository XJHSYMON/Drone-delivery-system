import {post} from "axios";

export function fetchChatAPIProcess() {
    const settingStore = useSettingStore()
    const authStore = useAuthStore()

    let data = {
        prompt: params.prompt,
        options: params.options,
    }

    return post({
        url: '/chat-process',
        data,
        signal: params.signal,
        onDownloadProgress: params.onDownloadProgress,
    })
}