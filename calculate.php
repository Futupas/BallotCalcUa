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
        if ($i != 0) echo "---\n";
        echo "Party \"$party->name\"\nPercents: $percent_match\nInfo: $party->info\n";
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
