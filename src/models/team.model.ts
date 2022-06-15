export interface ITeam {
    name: string;
    score: number;
}

export interface IScores {
    game: number;
    team1: ITeam;
    team2: ITeam;
}