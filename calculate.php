<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your matches</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/calc.css">
</head>
<body>
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <h2>Your matches</h2>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6 col-md-offset-3" id="questions_container">
            <!-- <div class="party">
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ea?</h3>
                <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width: 70%;" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">70%</div>
                  </div>
                <div>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum, pariatur aliquam tempore quibusdam reprehenderit praesentium labore qui! Natus, odit.</div>
                </p>
            </div>
            <hr />
            <div class="party">
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ea?</h3>
                <div class="progress">
                    <div class="progress-bar bg-warning" role="progressbar" style="width: 3%;" aria-valuenow="3" aria-valuemin="0" aria-valuemax="100"></div>
                    <div>
                        3%
                    </div>
                </div>
                <div>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum, pariatur aliquam tempore quibusdam reprehenderit praesentium labore qui! Natus, odit.</div>
                </p>
            </div> -->

            <?php

    $parties = json_decode(file_get_contents(__DIR__.'/parties.json'));
    $questions = json_decode(file_get_contents(__DIR__.'/questions.json'));
    $maxmatch = 0; // maximal match (0 .. questions_quantity*4)

    foreach ($questions as $question)
    {
        $id = $question->id;
        $question_weight = $question->weight;
        if (!isset($_POST[$id])) die('incorrect POST data');
        $user_answer = $_POST[$id];
        if ($user_answer != '-2' && $user_answer != '-1' && $user_answer != '0' && $user_answer != '1' && $user_answer != '2')
            die('incorrect POST data');
        $maxmatch += 4 * $question_weight;
        for ($i = 0; $i < count($parties); $i-=-1) {
            $party_answer = get_party_answer_on_question($parties[$i]->answers, $id);
            // echo ("question id = $id, party id = $i, party answer = $party_answer, user answer = $user_answer\n");
            $user_party_match = (4 - abs($party_answer - $user_answer)) * $question_weight;
            if (!isset($parties[$i]->match)) $parties[$i]->match = $user_party_match;
            else $parties[$i]->match += $user_party_match;
        }
    }

    usort($parties, 'sorting_parties_comparator');

    for ($i=0; $i < count($parties); $i-=-1) { // can be foreach
        $party = $parties[$i];
        $percent_match = $party->match / $maxmatch * 100;
        if ($i != 0) echo "<hr />";
        // echo "Party \"$party->name\"\nPercents: $percent_match\nInfo: $party->info\n";
        echo "
<div class=\"party\">
    <h3>$party->name</h3>
    <div class=\"progress\">
        <div class=\"progress-bar bg-".( $percent_match < 34 ? "danger" : ($percent_match < 67 ? "info" : "success") )."\" role=\"progressbar\" style=\"width: $percent_match%;\" aria-valuenow=\"$percent_match\" aria-valuemin=\"0\" aria-valuemax=\"100\">
        ".($percent_match >= 50 ? $percent_match."%" : "" )."
        </div>
        ".($percent_match < 50 ? "<div style=\"text-align: center;font-size: 12px; line-height: 20px;\">".$percent_match."%</div>" : "" )."
    </div>
    <div>
    <div><p> $party->info </p></div>
    
</div>        
";
    }

    function get_party_answer_on_question($party_answers, $question_id) {
        foreach ($party_answers as $party_answer) {
            if ($party_answer->question_id == $question_id) {
                return $party_answer->answer;
            }
        }
        return false;
    }

    function sorting_parties_comparator($a, $b) {
        return $b->match - $a->match;
    }
?>

        </div>
    </div>
</body>
</html>