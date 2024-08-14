export interface Wallpaper {
    id?: number;
    user_email: string;
    img_url: string;
    img_description: string;
    img_size?: string;
    user_nick?: string;
    llm_name?: string;
    llm_params?: string;
    created_at: string;
}