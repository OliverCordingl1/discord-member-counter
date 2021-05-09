import Settings from "./Settings";
export default class Command {
	private fullMessage: string;
	private fullCommand: string[];
	command: string;
	args: string[];

	constructor(c: string) {
		this.fullMessage = c;
		this.fullCommand = this.fullMessage.split(' ');
		this.command = this.fullCommand[0].slice(Settings.prefix.length);
		this.args = this.fullCommand.slice(1);
	}
}