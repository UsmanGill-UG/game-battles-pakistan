import { API_URL } from './constants'

export const SIGN_UP_URL = `${ API_URL }authentication/signup/`
export const SIGN_IN_URL = `${ API_URL }authentication/signin/`
export const SIGN_OUT_URL = `${ API_URL }authentication/signout/`
export const GAMES_FETCH_URL = `${ API_URL }games/`
export const GAMES_ADD_URL = `${ API_URL }games/`
export const GAMES_UPLOAD_IMAGE_URL = `${ API_URL }games/upload_game_image/`
export const OWNED_TEAMS_FETCH_URL = `${ API_URL }teams/owned_teams/`
export const TEAMS_FETCH_URL = `${ API_URL }teams/`
export const TEAMS_CREATE_URL = `${ API_URL }teams/create/`
export const TEAM_JOIN_URL = `${ API_URL }teams/join/`
export const TEAM_LEAVE_URL = `${ API_URL }teams/leave/`
export const TOURNAMENTS_FETCH_URL = `${ API_URL }tournaments/`
export const TOURNAMENTS_CREATE_URL = `${ API_URL }tournaments/`
export const TOURNAMENTS_JOIN_URL = `${ API_URL }tournaments/register_team/`
export const TOURNAMENTS_LEAVE_URL = `${ API_URL }tournaments/leave/`
// React with Bootstrap
export const HOME = '/'
export const SIGN_IN = '/signin'
export const SIGN_UP = '/signup'
export const ADD_GAME = '/addgame'
export const GAME_LIST = '/gamelist'
export const TEAM_CREATE = '/teamcreate'
export const TEAM_LIST = '/teamlist'
export const CREATE_TOURNAMENT = '/createtournament'
export const TOURNAMENT_LIST = '/tournamentlist'
// Material UI
export const SIGN_IN_MUI = '/signin_mui'
export const SIGN_UP_MUI = '/signup_mui'
export const ADD_GAME_MUI = '/addgame_mui'
export const GAME_LIST_MUI = '/gamelist_mui'
export const TEAM_CREATE_MUI = '/teamcreate_mui'
export const TEAM_LIST_MUI = '/teamlist_mui'
export const CREATE_TOURNAMENT_MUI = '/createtournament_mui'
export const TOURNAMENT_LIST_MUI = '/tournamentlist_mui'
