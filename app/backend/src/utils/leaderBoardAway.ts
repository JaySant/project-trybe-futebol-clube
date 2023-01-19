import { IMatches } from '../interfaces/IMatches';
import { ITeams } from '../interfaces/ITeams';
import ILeaderBoard from '../interfaces/ILeaderBoard';

export default (objLeaderBoard: ILeaderBoard, team: ITeams, matches: IMatches[]) => {
  const leadHome = { ...objLeaderBoard };
  matches.forEach((match) => {
    if (match.awayTeam === team.id) {
      leadHome.name = team.teamName;
      leadHome.goalsFavor += match.awayTeamGoals;
      leadHome.totalGames += 1;
      leadHome.goalsOwn += match.homeTeamGoals;
      if (match.homeTeamGoals < match.awayTeamGoals) leadHome.totalVictories += 1;
      if (match.homeTeamGoals === match.awayTeamGoals) leadHome.totalDraws += 1;
      if (match.homeTeamGoals > match.awayTeamGoals) leadHome.totalLosses += 1;
      leadHome.totalPoints = (leadHome.totalVictories * 3) + leadHome.totalDraws;
      leadHome.goalsBalance = leadHome.goalsFavor - leadHome.goalsOwn;
      leadHome.efficiency = ((leadHome.totalPoints / (leadHome.totalGames * 3)) * 100).toFixed(2);
    }
  });
  return leadHome;
};
