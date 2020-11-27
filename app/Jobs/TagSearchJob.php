<?php

namespace App\Jobs;

use App\Tag;
use App\TagSearch;
use App\TagTree;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class   TagSearchJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $tag_tree_id;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($tag_tree_id, $name = null)
    {
        //
        $this->tag_tree_id = $tag_tree_id;
        $this->name_tag = $name;
        $this->name = '';
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
        $tag_tree = TagTree::findOrFail($this->tag_tree_id);
        $parent_id = $tag_tree['parent_id'];
        $this->name = $tag_tree->tags->name;
//      $name_tag = ($this->name == null ? $tag_tree->tags->name : $this->name);
        $tag_seach = " > " . ($this->name_tag == null ? $this->name : $this->name_tag);
        $fin = true;
        while($fin)
        {
            if($parent_id == null)
            {
                $tag_seach = $this->name;
                $fin = false;

            }else{
                $parent = TagTree::findOrFail($parent_id);
                $tag_seach = $parent->tags->name . $tag_seach;
                if($parent['parent_id'] == null)
                {
                    $fin = false;

                }else{
                    $tag_seach = " > " . $tag_seach;
                    $parent_id = $parent['parent_id'];
                }
            }
        }
        $tagSeach = new TagSearch();
        $tagSeach->branch_id = 1;
        $tagSeach->tag = $this->name_tag == null ? $tag_tree->tags->name : $this->name_tag;
        $tagSeach->tree = $tag_seach;
        $tagSeach->status = "Activo";
        $tagSeach->tags_tree()->associate($tag_tree);
        $tagSeach->save();
    }
}
