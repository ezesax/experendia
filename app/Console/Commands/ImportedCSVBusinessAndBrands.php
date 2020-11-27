<?php

namespace App\Console\Commands;

use App\Tag;
use Illuminate\Console\Command;
use League\Csv\Reader;

class ImportedCSVBusinessAndBrands extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:business_and_brands';

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
        $csv = Reader::createFromPath(storage_path('csv/negocios_marcas.csv'), 'r');
        $csv->setDelimiter(",");
        $csv->setHeaderOffset(0);
        $records = $csv->getRecords();
        foreach ($records as $record)
        {
            if(Tag::where('name', $record["Level 1"])->exists())
            {
                $this->info($record["Level 1"]);
                $item = Tag::where('name', $record["Level 1"])->first();
                if(!$item->tag_type()->where('tag_type_id', 2)->exists())
                {
                    $item->tag_type()->syncWithoutDetaching([2]);
                }
            }else{

                $item = new Tag();
                $item->name = $record["Level 1"];
                $item->slug = mb_strtolower ($record["Level 1"]);
                $item->description = mb_strtolower ($record["Level 1"]);
                $item->keywords = mb_strtolower ($record["Level 1"]);;
                $item->icon = null;
                $item->image_default = null;
                $item->status = 'Activo';
                $item->save();
                $item->tag_type()->attach([2]);

            }
        }
    }
}
