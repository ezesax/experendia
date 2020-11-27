<?php

namespace App\Console\Commands;

use App\AliasMeaning;
use App\Jobs\TagSearchJob;
use App\Tag;
use App\TagAlias;
use App\TagTree;
use App\TagType;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;

class ImportedCSVLifeAndKnowledge extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:life_and_knowledge';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //

        $csv = Reader::createFromPath(storage_path('csv/branches_vida_conocimiento.csv'), 'r');
        $csv->setDelimiter("\t");
        $csv->setHeaderOffset(0);
        $records = $csv->getRecords();
        foreach ($records as $record)
        {
            $this->info($record["Level 1"]);
            $this->insertLevel($record["Level 1"], null);

            if(!empty($record["Level 2"]))
            {
                $this->info($record["Level 2"]);
                $tag_nivel_1 = explode(',', $record["Level 1"]);
                $tag_parent = Tag::where('name', $tag_nivel_1[0])->first();
                $parent = TagTree::where('tag_id', $tag_parent->id)
                ->whereNull('parent_id')->first();
                $this->insertLevel($record["Level 2"], $parent->id );
                }
            if(!empty($record["Level 3"]))
            {
                $this->info($record["Level 3"]);
                $tag_nivel_1 = explode(',', $record["Level 1"]);
                $tag_nivel_2 = explode(',', $record["Level 2"]);
                $tag_parent_1 = Tag::where('name', $tag_nivel_1[0])->first();
                $tag_parent_2 = Tag::where('name', $tag_nivel_2[0])->first();
                $parent_1 = TagTree::where('tag_id', $tag_parent_1->id)
                    ->wherenull('parent_id')->first();
                $parent_2 = TagTree::where('tag_id', $tag_parent_2->id)
                    ->where('parent_id', $parent_1->id)->first();
                $this->insertLevel($record["Level 3"], $parent_2->id );
            }
            if(!empty($record["Level 4"]))
            {
                $this->info($record["Level 4"]);
                $tag_nivel_1 = explode(',', $record["Level 1"]);
                $tag_nivel_2 = explode(',', $record["Level 2"]);
                $tag_nivel_3 = explode(',', $record["Level 3"]);
                $tag_parent_1 = Tag::where('name', $tag_nivel_1[0])->first();
                $tag_parent_2 = Tag::where('name', $tag_nivel_2[0])->first();
                $tag_parent_3 = Tag::where('name', $tag_nivel_3[0])->first();
                $parent_1 = TagTree::where('tag_id', $tag_parent_1->id)
                    ->wherenull('parent_id')->first();
                $parent_2 = TagTree::where('tag_id', $tag_parent_2->id)
                    ->where('parent_id', $parent_1->id)->first();
                $parent_3 = TagTree::where('tag_id', $tag_parent_3->id)
                    ->where('parent_id', $parent_2->id)->first();
                $this->insertLevel($record["Level 4"], $parent_3->id );
            }
            if(!empty($record["Level 5"]))
            {
                $this->info($record["Level 5"]);
                $tag_nivel_1 = explode(',', $record["Level 1"]);
                $tag_nivel_2 = explode(',', $record["Level 2"]);
                $tag_nivel_3 = explode(',', $record["Level 3"]);
                $tag_nivel_4 = explode(',', $record["Level 4"]);
                $tag_parent_1 = Tag::where('name', $tag_nivel_1[0])->first();
                $tag_parent_2 = Tag::where('name', $tag_nivel_2[0])->first();
                $tag_parent_3 = Tag::where('name', $tag_nivel_3[0])->first();
                $tag_parent_4 = Tag::where('name', $tag_nivel_4[0])->first();
                $parent_1 = TagTree::where('tag_id', $tag_parent_1->id)
                    ->wherenull('parent_id')->first();
                $parent_2 = TagTree::where('tag_id', $tag_parent_2->id)
                    ->where('parent_id', $parent_1->id)->first();
                $parent_3 = TagTree::where('tag_id', $tag_parent_3->id)
                    ->where('parent_id', $parent_2->id)->first();
                $parent_4 = TagTree::where('tag_id', $tag_parent_4->id)
                    ->where('parent_id', $parent_3->id)->first();
                $this->insertLevel($record["Level 5"], $parent_4->id );
            }
            if(!empty($record["Level 6"]))
            {
                $this->info($record["Level 6"]);
                $tag_nivel_1 = explode(',', $record["Level 1"]);
                $tag_nivel_2 = explode(',', $record["Level 2"]);
                $tag_nivel_3 = explode(',', $record["Level 3"]);
                $tag_nivel_4 = explode(',', $record["Level 4"]);
                $tag_nivel_5 = explode(',', $record["Level 5"]);
                $tag_parent_1 = Tag::where('name', $tag_nivel_1[0])->first();
                $tag_parent_2 = Tag::where('name', $tag_nivel_2[0])->first();
                $tag_parent_3 = Tag::where('name', $tag_nivel_3[0])->first();
                $tag_parent_4 = Tag::where('name', $tag_nivel_4[0])->first();
                $tag_parent_5 = Tag::where('name', $tag_nivel_5[0])->first();
                $parent_1 = TagTree::where('tag_id', $tag_parent_1->id)
                    ->wherenull('parent_id')->first();
                $parent_2 = TagTree::where('tag_id', $tag_parent_2->id)
                    ->where('parent_id', $parent_1->id)->first();
                $parent_3 = TagTree::where('tag_id', $tag_parent_3->id)
                    ->where('parent_id', $parent_2->id)->first();
                $parent_4 = TagTree::where('tag_id', $tag_parent_4->id)
                    ->where('parent_id', $parent_3->id)->first();
                $parent_5 = TagTree::where('tag_id', $tag_parent_5->id)
                    ->where('parent_id', $parent_4->id)->first();
                $this->insertLevel($record["Level 6"], $parent_5->id );
            }
        }
    }

    private function insertTag($record)
    {
        $item = new Tag();
        $item->name = $record[0];
        $item->slug = mb_strtolower ($record[0]);
        $item->description = mb_strtolower ($record[0]);
        $item->keywords = mb_strtolower ($record[0]);;
        $item->icon = null;
        $item->image_default = null;
        $item->status = 'Activo';
        $item->save();
        $item->tag_type()->syncWithoutDetaching([3]);
        return $item;
    }

    private function insertTree(Tag $item_tag, $parent)
    {
        $item = new TagTree();
        $item->tree = 1;
        $item->branch = 1;
        $item->level = 1;
        $item->parent_id = $parent;
        $item->status = 'Activo';
        $item->tags()->associate($item_tag->id);
        $item->save();
        return $item;
    }

    private function insertTagSearch(TagTree $item_tree)
    {
        TagSearchJob::dispatchNow($item_tree->id);
    }

    private function insertTagAlias(array $tag, TagTree $item_tree)
    {
        if(count($tag) > 1)
        {
            $alias_array = [];
            $alias = TagAlias::max('alias') + 1 ;
            foreach ($tag as $key => $alias_name)
            {
                if($key > 0){
                    $alias_array[] = new TagAlias([
                        "name" => $alias_name,
                        "alias" => $alias,
                        "status" => 'Activo'
                    ]);
                }
            }
            $item_tree->aliases()->saveMany($alias_array);
            foreach ($alias_array as $alias){
                TagSearchJob::dispatchNow($item_tree->id, $alias->name);
            }
            return true;
        }
        return false;
    }

    private function insertLevel($record, $parent)
    {
        $tag = explode(',', $record);
        $newTag = [];
        foreach ($tag as $t)
        {
            $newTag[] = trim($t);
        }
        $tag = $newTag;
        if(Tag::where('name', $tag[0])->exists())
        {
            $this->checkTagType($tag);
            $tag_tree = Tag::where('name', $tag[0])->first();
            if(!TagTree::where('tag_id', $tag_tree->id)->where('parent_id', $parent)->exists())
            {
                $item_tree = $this->insertTree($tag_tree, $parent);
                $this->insertTagSearch($item_tree);
                $alias = $this->insertTagAlias($tag, $item_tree);
                $this->insertAliasMeaning($alias, $item_tree, $tag_tree, $tag);
            }
        }else{
            $item_tag = $this->insertTag($tag);
            $item_tree = $this->insertTree($item_tag, $parent);
            $this->insertTagSearch($item_tree);
            $alias = $this->insertTagAlias($tag, $item_tree);
            $this->insertAliasMeaning($alias, $item_tree, $item_tag, $tag);
        }

    }

    private function insertAliasMeaning(bool $alias, TagTree $item_tree, Tag $item_tag, array $tag)
    {
        if($alias)
        {
            foreach ($tag as $key => $alias_name)
            {
                if($key > 0)
                {
                    $tag_alias_alias = TagAlias::where('name', $alias_name)
                        ->where('tag_tree_id', $item_tree->id)->first();
                    $aliasMeaning = new AliasMeaning();
                    $aliasMeaning->alias = $tag_alias_alias->alias;
                    $aliasMeaning->tag()->associate($item_tag);
                    $aliasMeaning->tree()->associate($item_tree);
                    $aliasMeaning->save();
                }
            }
        }
    }

    private function checkTagType(array $tag)
    {
        $item = Tag::where('name', $tag[0])->first();
        if(!$item->tag_type()->where('tag_type_id', 3)->exists())
        {
            $item->tag_type()->syncWithoutDetaching([3]);
        }
    }
}
