import { event } from "./event";
import { galleryCategory } from "./galleryCategory";
import { galleryItem } from "./galleryItem";
import { partner } from "./partner";
import podcastEpisode from "./podcastEpisode";
import { post } from "./post";
import { program } from "./program";
import { project } from "./project";
import { resource } from "./resource";
import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";

export const schemaTypes = [
    siteSettings, 
    event, 
    post, 
    partner, 
    resource, 
    galleryItem, 
    teamMember, 
    program, 
    galleryCategory, 
    project,
    podcastEpisode,
]
