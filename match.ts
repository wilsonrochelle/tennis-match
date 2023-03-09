export class Match {
	private player1Name: string = '';
	private player1: Player;
	private player2: Player;
	private setScore: SetScore;
	private gameScore: GameScore;

	constructor(player1Name: string, player2Name: string) {
		this.player1Name = player1Name;
		this.player1 = new Player(player1Name);
		this.player2 = new Player(player2Name);
		this.setScore = new SetScore(this.player1, this.player2);
		this.gameScore = new GameScore(this.player1, this.player2);
	}

   	score(): string {
		const setScore = this.setScore.getScore();
		const gameScore = this.gameScore.getScore();
		if (gameScore) {
			return `${setScore}, ${gameScore}`;
		} else {
			return setScore;
		};
   	}

	pointWonBy(playerName: string): void {
		const score1 = this.player1.getSetScore();
		const score2 = this.player2.getSetScore();
		const maxGamePoint = 40;
		const player = playerName === this.player1Name ? this.player1 : this.player2;
		if (score1 === 6 && score2 === 6) {
			this.setScore.updateScore(player);
		} else if (this.player1.getGameScore() === maxGamePoint && this.player2.getGameScore() === maxGamePoint) {
			this.gameScore.updateScore(player);
		} else if (player.getGameScore() === maxGamePoint) {
			this.setScore.updateScore(player);
		} else {
			this.gameScore.updateScore(player);
		}
	}
}

abstract class Score {
	player1: Player;
	player2: Player;

	constructor(player1: Player, player2: Player) {
		this.player1 = player1;
		this.player2 = player2;
	}

	abstract updateScore(player: Player): void;
	abstract getScore(): string
}

class SetScore extends Score {
	updateScore(player: Player): void {
		const score1 = this.player1.getSetScore();
		const score2 = this.player2.getSetScore();
		if (score1 === 6 && score2 === 6) {
			player.setTieBreaker();
			this.updateSetScoreIfTieBreakerHasBeenWon();
		} else {
			player.setSetScore();
			this.resetGamePoints();
		}

	}

	private updateSetScoreIfTieBreakerHasBeenWon(): void {
		const tieBreakScore1 = this.player1.getTieBreaker();
		const tieBreakScore2 = this.player2.getTieBreaker();
		if (tieBreakScore1 >= 7 && tieBreakScore2 <= tieBreakScore1 - 2) {
			this.player1.setSetScore();
		} else if (tieBreakScore2 >= 7 && tieBreakScore1 <= tieBreakScore2 - 2) {
			this.player2.setSetScore();
		}
	}

	private resetGamePoints(): void {
		this.player1.resetGameScore();
		this.player2.resetGameScore();
	}

	getScore(): string {
		const score1 = this.player1.getSetScore();
		const score2 = this.player2.getSetScore();
		const setScore = `${score1}-${score2}`

		if (score1 >= 6 && score2 <= score1 - 2) {
			return `${setScore}, well done ${this.player1.getPlayerName()}`;
		} else if (score2 >= 6 && score1 <= score2 - 2) {
			return `${setScore}, well done ${this.player2.getPlayerName()}`;
		} else if (score1 === 6 && score2 === 6) {
			const tieBreakScore1 = this.player1.getTieBreaker();
			const tieBreakScore2 = this.player2.getTieBreaker();
			const tieBreakScore = tieBreakScore1 === 0 && tieBreakScore2 === 0 ? '' : `${tieBreakScore1}-${tieBreakScore2}`;
			return tieBreakScore ? `${setScore}, ${tieBreakScore}` : `${setScore}, tie break required`;
		} else if (score1 === 7 && score2 === 6) {
			return `${setScore}, well done ${this.player1.getPlayerName()}`;
		} else if (score2 === 7 && score1 === 6) {
			return `${setScore}, well done ${this.player2.getPlayerName()}`;
		} else {
			return setScore;
		}
	}
}

class GameScore extends Score {
	private deucePoint = 40;

	updateScore(player: Player): void {
		const otherPlayer = player.getPlayerName() === this.player1.getPlayerName() ? this.player2 : this.player1;
		const isDeuce = this.player1.getGameScore() === this.deucePoint && this.player2.getGameScore() === this.deucePoint;
		const shouldSetAdv = isDeuce && player.isAdvantage() === false && otherPlayer.isAdvantage() === false;
		if (shouldSetAdv) {
			player.setIsAdvantage();
		} else if (isDeuce && player.isAdvantage() === false && otherPlayer.isAdvantage() === true) { 
			otherPlayer.resetIsAdvantage();
		} else if (isDeuce && player.isAdvantage() === true) {
			player.resetIsAdvantage();
			player.setSetScore();
			this.player1.resetGameScore();
			this.player2.resetGameScore();
		} else {
			player.resetIsAdvantage();
			player.setGameScore();
		}
	}

	getScore(): string {
		const score1 = this.player1.getGameScore();
		const score2 = this.player2.getGameScore();
		const minGamePoint = 0;
		
		if (score1 === minGamePoint && score2 === minGamePoint) {
			return '';
		} else if (this.player1.isAdvantage()) {
			return `advantage ${this.player1.getPlayerName()}`;
		} else if (this.player2.isAdvantage()) {
			return `advantage ${this.player2.getPlayerName()}`;
		} else if (score1 === this.deucePoint && score2 === this.deucePoint) {
			return 'deuce';
		} else {
			return `${score1}-${score2}`;
		}
	}
}

class Player {
	private readonly gameScores: number[] = [0, 15, 30, 40];
	private gamePoints: number = 0;
	private advantage: boolean = false;
	private setPoints: number = 0;
	private tieBreaker: number = 0;

	constructor(private playerName: string) {}

	getPlayerName(): string {
		return this.playerName;
	}

	// PlayerTieBreaker
	setTieBreaker(): void {
		this.tieBreaker += 1;
	}

	getTieBreaker(): number {
		return this.tieBreaker;
	}

	// PlayerSetScore
	getSetScore(): number {
		return this.setPoints;
	}

	setSetScore(): void {
		this.setPoints += 1;
	}

	resetSetScore(): void {
		this.setPoints = 0;
	}

	// PlayerGameScore
	getGameScore(): number {
		return this.gameScores[this.gamePoints];
	}

	setGameScore(): void {
		this.gamePoints += 1;
	}

	resetGameScore(): void {
		this.gamePoints = 0;
	}

	// PlayerAdvantage
	isAdvantage(): boolean {
		return this.advantage;
	}

	setIsAdvantage(): void {
		this.advantage = true;
	}

	resetIsAdvantage(): void {
		this.advantage = false;
	}
}
