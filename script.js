let play_btn = document.getElementById("play-btn");
let play_ground = document.querySelector(".panel-bottom");
let hit_number_box = document.getElementById("value-to-hit");
let time_box = document.getElementById("timer");
let score_box = document.getElementById("score-value");
let time = 20; // time (made changes in both)
let game_time;
let score = 0;
let user_hit_num;

function set_to_none() {
	time = 20; // time (made changes in both)
	time_box.innerText = time;
	score = 0;
	score_box.innerText = score;
	time_box.innerText = "";
}

let random_num_to_hit = 0;
function hit_generate() {
	random_num_to_hit = Math.floor(Math.random() * 10);
	hit_number_box.innerText = random_num_to_hit;
}

function game_time_over() {
	clearInterval(game_time);
}

function start_time() {
	game_time = setInterval(() => {
		time--;
		if (time > -1) {
			time_box.innerText = time;
		} else {
			game_time_over();
			play_ground.style.flexDirection = "column";
			play_ground.innerHTML = `<h1>Game Over 🥺</h1>`;
			let playButton = document.createElement("button");
			playButton.id = "play-btn";
			playButton.type = "button";
			playButton.innerText = "Play";
			playButton.addEventListener("click", function () {
				bubbles_generate();
				hit_generate();
				set_to_none();
				start_time();
			});
			play_ground.appendChild(playButton);
		}
	}, 1000);
}

function score_generate() {
	score++;
	score_box.innerText = score;
}

function bubbles_generate() {
	let clutter = "";
	for (let i = 0; i < 90; i++) {
		let bubble_num = Math.floor(Math.random() * 10);
		clutter += `<div class="bubble">${bubble_num}</div>`;
	}
	play_ground.innerHTML = clutter;
}

function start_game() {
	play_ground.addEventListener(
		"click",
		function (e) {
			e.preventDefault();

			user_hit_num = Number(e.target.innerText);
			if (user_hit_num === random_num_to_hit) {
				score_generate();
				if (score < 5) {
					bubbles_generate();
					hit_generate();
				} else {
					game_time_over();
					play_ground.style.flexDirection = "column";
					play_ground.innerHTML = `<h1>You Win 😎</h1>`;
					let playButton = document.createElement("button");
					playButton.id = "play-btn";
					playButton.type = "button";
					playButton.innerText = "Play";
					playButton.addEventListener("click", function () {
						bubbles_generate();
						hit_generate();
						set_to_none();
						start_time();
					});
					play_ground.appendChild(playButton);
				}
			}
		},
		false,
	);
}

play_btn.addEventListener(
	"click",
	function (e) {
		e.preventDefault();

		// console.log("let's play");
		bubbles_generate();
		hit_generate();
		set_to_none();
		start_time();
		start_game();
	},
	false,
);
