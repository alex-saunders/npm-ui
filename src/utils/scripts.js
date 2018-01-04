import { spawn } from 'child_process';

class Executor {
  constructor(script) {
    this.process = null;

    this.process = spawn(`npm run ${script}`, ['--ansi'], { shell: true });
    this.process.stdout.setEncoding('utf8');
  }

  closeProcess() {
    if (this.process == null) return;

    this.process.kill('SIGINT');
    this.process = null;
  }
}

export default Executor;